import { ModelingFormType } from "@/components/forms/modeling/schema";
import { GLOBAL } from "@/constants/values";
import { getTrellisModeling } from "@/services/modeling";
import {
  CurrentModelingStatus,
  currentModelingStore,
  updateCurrentModelingStore,
} from "@/stores/slices/current_modeling_store";
import { updateModelViewerStore } from "@/stores/slices/model_viewer_store";
import { addModelingGenerationRecord } from "@/stores/slices/modeling_generation_store";
import { createScopedLogger } from "@/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { toast } from "sonner";

export const logger = createScopedLogger("useTrellisAsync");

interface UseTrellisAsyncProps {
  getValues: UseFormWatch<ModelingFormType>;
  validateForm: (formData: ModelingFormType) => void;
}

export function useTrellisAsync({
  getValues,
  validateForm,
}: UseTrellisAsyncProps) {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_generator"
  );

  const updateCurrentModeling = useSetAtom(updateCurrentModelingStore);
  const updateModelViewer = useSetAtom(updateModelViewerStore);
  const currentModeling = useAtomValue(currentModelingStore);
  const _addModelingGenerationRecord = useSetAtom(addModelingGenerationRecord);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTrellisModel = useCallback(async () => {
    const formData = getValues();
    logger.info("Current form data:", formData);

    validateForm(formData);

    const getModeling = async () => {
      setIsGenerating(true);

      updateCurrentModeling({
        taskId: "",
        modelingSettings: formData,
        status: CurrentModelingStatus.PENDING,
        attempt: 0,
      });
      return await getTrellisModeling(formData.imageSrc);
    };
    toast.promise(getModeling(), {
      loading: t("toast.generating"),
      success: (data) => {
        const createAt = Date.now();
        _addModelingGenerationRecord({
          taskId: "",
          modelUrl: data,
          textures: [],
          createAt,
          modelingForm: formData,
        });
        updateCurrentModeling({
          ...currentModeling,
          taskId: "",
          status: CurrentModelingStatus.SUCCESS,
        });
        updateModelViewer({
          modelUrl: data,
          textures: [],
          fileType: formData.modelingFormat,
          modelingModel: "Trellis",
          key: createAt,
        });

        setIsGenerating(false);

        logger.info("Trellis modeling:", data);
        return t("toast.success");
      },
      error: (error) => {
        updateCurrentModeling({
          ...currentModeling,
          status: CurrentModelingStatus.FAILED,
        });
        setIsGenerating(false);
        logger.error("Error generating trellis modeling", error);
        return t("toast.failed");
      },
      id: GLOBAL.TOAST_ID.MODELING,
    });
  }, [
    getValues,
    validateForm,
    t,
    updateCurrentModeling,
    _addModelingGenerationRecord,
    currentModeling,
    updateModelViewer,
  ]);

  return {
    handleGenerateTrellisModel,
    isGenerating,
  };
}
