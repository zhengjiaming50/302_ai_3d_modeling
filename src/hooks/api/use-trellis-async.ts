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

  // 保存模型到数据库
  const saveModelToDatabase = async (modelUrl: string, imageId: string, formData: ModelingFormType) => {
    try {
      const fileName = `model-${Date.now()}.${formData.modelingFormat || 'glb'}`;
      const parametersJson = JSON.stringify({
        modelingModel: formData.modelingModel,
        modelingFormat: formData.modelingFormat,
        modelingQuality: formData.modelingQuality,
        useHyper: formData.useHyper,
        modelingTier: formData.modelingTier,
      });

      const response = await fetch('/api/models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          fileUrl: modelUrl,
          format: formData.modelingFormat || 'glb',
          parameters: parametersJson,
          imageId,
        }),
      });

      const result = await response.json();
      logger.info('Model saved to database:', result);
      return result.id;
    } catch (error) {
      logger.error('Failed to save model to database:', error);
      throw error;
    }
  };

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
      success: async (data) => {
        const createAt = Date.now();
        
        // 保存模型到数据库 - 只保存模型，图片已经存在
        let modelId;
        try {
          // 使用表单中已有的imageId，不再重复保存图片
          const imageId = formData.imageId;
          if (imageId) {
            // 保存模型并关联到已有图片
            modelId = await saveModelToDatabase(data, imageId, formData);
            
            // 添加模型ID到记录中
            _addModelingGenerationRecord({
              taskId: "",
              modelUrl: data,
              textures: [],
              createAt,
              modelingForm: formData,
              modelId, // 添加模型ID
            });
          } else {
            logger.warn('No imageId provided, model will not be associated with any image');
            
            // 没有imageId的情况下仍然添加记录，但不保存到数据库
            _addModelingGenerationRecord({
              taskId: "",
              modelUrl: data,
              textures: [],
              createAt,
              modelingForm: formData
            });
          }
        } catch (dbError) {
          logger.error("Error saving model to database:", dbError);
          
          // 即使数据库保存失败，也继续显示模型和添加记录
          _addModelingGenerationRecord({
            taskId: "",
            modelUrl: data,
            textures: [],
            createAt,
            modelingForm: formData
          });
        }
        
        // 更新当前模型和查看器
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
