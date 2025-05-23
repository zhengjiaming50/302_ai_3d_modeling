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

// 使用真实API保存模型到数据库
async function saveModelToDatabase(modelData: {
  fileName: string;
  fileUrl: string;
  format: string;
  size: number;
  parameters: string;
  imageId: string;
}): Promise<{ id: string; localFilePath?: string }> {
  try {
    const response = await fetch('/api/models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modelData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save model');
    }
    
    const data = await response.json();
    return { 
      id: data.id,
      localFilePath: data.localFilePath
    };
  } catch (error) {
    logger.error("Failed to save model via API:", error);
    throw error;
  }
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

    if (!formData.imageId) {
      logger.warn("No image ID provided. Model will not be associated with any image.");
    }

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
        const fileName = `model-${createAt}.glb`;
        const blob = new Blob([response], { type: "model/gltf-binary" });
        const glbFile = new File([blob], fileName, {
          type: "model/gltf-binary",
        });
        const [uploadedFile] = await upload([glbFile]);
        
        const parametersJson = JSON.stringify({
          modelingModel: formData.modelingModel,
          modelingFormat: formData.modelingFormat,
          modelingQuality: formData.modelingQuality,
          modelingTier: formData.modelingTier,
          useHyper: formData.useHyper,
          createdAt: createAt
        });
        
        try {
          // 使用API保存模型数据 - 只保存模型，不重复保存图片
          let modelId;
          if (formData.imageId) {
            const modelData = await saveModelToDatabase({
              fileName: fileName,
              fileUrl: uploadedFile.url,
              format: "glb",
              size: blob.size,
              parameters: parametersJson,
              imageId: formData.imageId
            });
            
            modelId = modelData.id;
            logger.info("Model saved to database with ID:", modelData.id);
            if (modelData.localFilePath) {
              logger.info("Model saved locally at:", modelData.localFilePath);
            }
          } else {
            logger.warn("No imageId provided, model will not be saved to database");
          }
          
          _addModelingGenerationRecord({
            taskId: "",
            modelUrl: uploadedFile.url,
            textures: [],
            createAt,
            modelingForm: formData,
            modelId
          });
        } catch (dbError) {
          const errorMessage = 
            dbError instanceof Error ? dbError.message : "Unknown database error";
          logger.error("Failed to save model to database:", errorMessage);
          
          // 即使数据库保存失败，也继续添加记录
          _addModelingGenerationRecord({
            taskId: "",
            modelUrl: uploadedFile.url,
            textures: [],
            createAt,
            modelingForm: formData
          });
        }

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
