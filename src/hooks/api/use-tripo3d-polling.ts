import { useCallback, useEffect, useState } from "react";
import { useModelingPolling } from "./use-modeling-polling";
import {
  CurrentModelingStatus,
  currentModelingStore,
  updateCurrentModelingStore,
} from "@/stores/slices/current_modeling_store";
import { GLOBAL } from "@/constants/values";
import {
  getTripo3DModeling,
  getTripo3DModelingTask,
  Tripo3DModelingResponse,
} from "@/services/modeling";
import { useAtomValue, useSetAtom } from "jotai";
import { ModelingFormType } from "@/components/forms/modeling/schema";
import { UseFormWatch } from "react-hook-form";
import { createScopedLogger } from "@/utils";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ModelingConfigBase } from "./use-modeling-polling";
import { useUnifiedFileUpload } from "../global/use-unified-file-upload";

const logger = createScopedLogger("useTripo3DPolling");

interface UseTripo3DPollingProps {
  getValues: UseFormWatch<ModelingFormType>;
  validateForm: (formData: ModelingFormType) => void;
}

export function useTripo3DPolling({
  getValues,
  validateForm,
}: UseTripo3DPollingProps) {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_generator"
  );

  const [id, setTaskId] = useState("");

  const currentModeling = useAtomValue(currentModelingStore);
  const updateCurrentModeling = useSetAtom(updateCurrentModelingStore);

  const { upload } = useUnifiedFileUpload();

  const TRIPO3D_CONFIG: ModelingConfigBase<Tripo3DModelingResponse> = {
    url: "tripo3d/v2/openapi/task",
    getModelUrl: async (data) => {
      const modelUrl = data.data.result.pbr_model.url;

      try {
        const response = await fetch(modelUrl);
        const blob = await response.blob();
        const file = new File([blob], `tripo3d_model_${Date.now()}.glb`);

        const [uploadedFile] = await upload([file]);

        return uploadedFile.url;
      } catch (error) {
        logger.error("Error uploading model file:", error);
        return modelUrl;
      }
    },
    isSuccess: (data) => data.data.status === "success",
    isFailed: (data) => data.data.status === "failed",
    fetcher: getTripo3DModeling,
  };
  const { isPolling, setIsPolling } = useModelingPolling({
    taskId: id,
    config: TRIPO3D_CONFIG,
  });

  const handleGenerateTripo3DModel = useCallback(async () => {
    setIsPolling(true);

    const formData = getValues();
    logger.info("Current form data:", formData);

    validateForm(formData);

    const { imageSrc } = formData;

    try {
      const {
        data: { task_id: taskId },
      } = await getTripo3DModelingTask(imageSrc);

      setTaskId(taskId);

      toast.loading(t("toast.generating"), {
        id: GLOBAL.TOAST_ID.MODELING,
      });

      updateCurrentModeling({
        taskId,
        modelingSettings: formData,
        status: CurrentModelingStatus.PENDING,
        attempt: 0,
      });
    } catch (error) {
      setIsPolling(false);

      toast.error(t("toast.failed"), {
        id: GLOBAL.TOAST_ID.MODELING,
      });

      logger.error("Error generating tripo3d modeling", error);
    }
  }, [setIsPolling, t, updateCurrentModeling, validateForm, getValues]);

  useEffect(() => {
    const {
      taskId,
      status,
      modelingSettings: { modelingModel },
    } = currentModeling;
    if (
      taskId !== "" &&
      status === CurrentModelingStatus.PENDING &&
      modelingModel === "Tripo3D"
    ) {
      setTaskId(taskId);
    }

    return () => setTaskId("");
  }, [currentModeling]);

  return { isPolling, handleGenerateTripo3DModel };
}
