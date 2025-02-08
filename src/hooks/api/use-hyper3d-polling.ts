import { useCallback, useEffect, useState } from "react";
import { useModelingPolling } from "./use-modeling-polling";
import {
  CurrentModelingStatus,
  currentModelingStore,
  updateCurrentModelingStore,
} from "@/stores/slices/current_modeling_store";
import { GLOBAL } from "@/constants/values";
import {
  getHyper3DModeling,
  getHyper3DModelingTask,
  Hyper3DModelingResponse,
} from "@/services/modeling";
import { useAtomValue, useSetAtom } from "jotai";
import { ModelingFormType } from "@/components/forms/modeling/schema";
import { UseFormWatch } from "react-hook-form";
import { createScopedLogger } from "@/utils";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ModelingConfigBase } from "./use-modeling-polling";

const logger = createScopedLogger("useHyper3DPolling");

interface UseHyper3DPollingProps {
  getValues: UseFormWatch<ModelingFormType>;
  validateForm: (formData: ModelingFormType) => void;
}

const HYPER3D_CONFIG: ModelingConfigBase<Hyper3DModelingResponse> = {
  url: "302/submit/hyper3d-rodin",
  getModelUrl: async (data) => data.model_mesh?.url,
  getTextureUrl: (data) => data.textures.map((texture) => texture.url),
  isSuccess: (data) => data.hasOwnProperty("model_mesh"),
  fetcher: getHyper3DModeling,
};

export function useHyper3DPolling({
  getValues,
  validateForm,
}: UseHyper3DPollingProps) {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_generator"
  );

  const [id, setTaskId] = useState("");

  const currentModeling = useAtomValue(currentModelingStore);

  const updateCurrentModeling = useSetAtom(updateCurrentModelingStore);

  const { isPolling, setIsPolling } = useModelingPolling({
    taskId: id,
    config: HYPER3D_CONFIG,
  });

  const handleGenerateHyper3DModel = useCallback(async () => {
    setIsPolling(true);

    const formData = getValues();
    logger.info("Current form data:", formData);

    validateForm(formData);

    const {
      imageSrc,
      modelingFormat,
      modelingQuality,
      useHyper,
      modelingTier,
    } = formData;

    try {
      const { request_id: taskId } = await getHyper3DModelingTask({
        imageUrl: imageSrc,
        format: modelingFormat ?? "glb",
        quality: modelingQuality ?? "medium",
        useHyper: useHyper ?? false,
        tier: modelingTier ?? "Regular",
      });

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

      logger.error("Error generating hyper3d modeling", error);
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
      modelingModel === "Hyper3D"
    ) {
      setTaskId(taskId);
    }

    return () => setTaskId("");
  }, [currentModeling]);

  return { isPolling, handleGenerateHyper3DModel };
}
