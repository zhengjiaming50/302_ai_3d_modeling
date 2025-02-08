import { ModelingFormType } from "@/components/forms/modeling/schema";
import { CurrentModelingStatus } from "@/stores/slices/current_modeling_store";
import { useAtomValue } from "jotai";
import { currentModelingStore } from "@/stores/slices/current_modeling_store";
import { updateCurrentModelingStore } from "@/stores/slices/current_modeling_store";
import { updateModelViewerStore } from "@/stores/slices/model_viewer_store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { addModelingGenerationRecord } from "@/stores/slices/modeling_generation_store";
import { createScopedLogger } from "@/utils";
import { toast } from "sonner";
import { GLOBAL } from "@/constants";
import { getStableFast3DModeling } from "@/services/modeling";
import { useUnifiedFileUpload } from "../global/use-unified-file-upload";

export const logger = createScopedLogger("useStableFast3DAsync");

interface UseStableFast3DAsyncProps {
  getValues: UseFormWatch<ModelingFormType>;
  validateForm: (formData: ModelingFormType) => void;
}

export function useStableFast3DAsync({
  getValues,
  validateForm,
}: UseStableFast3DAsyncProps) {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_generator"
  );

  const { upload } = useUnifiedFileUpload();

  const updateCurrentModeling = useSetAtom(updateCurrentModelingStore);
  const updateModelViewer = useSetAtom(updateModelViewerStore);
  const currentModeling = useAtomValue(currentModelingStore);
  const _addModelingGenerationRecord = useSetAtom(addModelingGenerationRecord);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStableFast3DModel = useCallback(async () => {
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

      const response = await fetch(formData.imageSrc);
      const blob = await response.blob();
      const imageFile = new File([blob], "input-image.png", {
        type: "image/png",
      });

      return await getStableFast3DModeling(imageFile);
    };
    toast.promise(getModeling(), {
      loading: t("toast.generating"),
      success: async (response) => {
        const createAt = Date.now();
        const blob = new Blob([response], { type: "model/gltf-binary" });
        const glbFile = new File([blob], `model-${createAt}.glb`, {
          type: "model/gltf-binary",
        });
        const [uploadedFile] = await upload([glbFile]);

        _addModelingGenerationRecord({
          taskId: "",
          modelUrl: uploadedFile.url,
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
          modelUrl: uploadedFile.url,
          textures: [],
          fileType: formData.modelingFormat,
          modelingModel: "StableFast3D",
          key: createAt,
        });

        setIsGenerating(false);

        logger.info("StableFast3D modeling:", uploadedFile.url);
        return t("toast.success");
      },
      error: (error) => {
        updateCurrentModeling({
          ...currentModeling,
          status: CurrentModelingStatus.FAILED,
        });
        setIsGenerating(false);
        logger.error("Error generating stable fast 3d modeling", error);
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
    upload,
  ]);

  return {
    handleGenerateStableFast3DModel,
    isGenerating,
  };
}
