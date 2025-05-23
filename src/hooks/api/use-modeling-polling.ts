import { GLOBAL } from "@/constants";
import { useEffect } from "react";
import {
  CurrentModelingStatus,
  currentModelingStore,
  updateCurrentModelingStore,
} from "@/stores/slices/current_modeling_store";
import { addModelingGenerationRecord } from "@/stores/slices/modeling_generation_store";
import { createScopedLogger } from "@/utils/logger";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import {
  SupportedFileTypes,
  SupportedModelingModel,
  updateModelViewerStore,
} from "@/stores/slices/model_viewer_store";
import { ModelingFormType } from "@/components/forms/modeling/schema";

const logger = createScopedLogger("useModelingPolling");

const MAX_POLLING_ATTEMPTS = 60;
const MAX_RETRY_COUNT = 3;
const EXCEEDED_MAX_POLLING_ATTEMPTS_ERROR = "Exceeded max polling attempts";
const NORMAL_ERROR = "Normal error";
const MODELING_FAILED_ERROR = "Modeling failed";

export interface ModelingConfigBase<T> {
  url: string;
  getModelUrl: (data: T) => Promise<string>;
  getTextureUrl?: (data: T) => Array<string>;
  isSuccess: (data: T) => boolean;
  isFailed?: (data: T) => boolean;
  fetcher: (params: { apiUrl: string; taskId: string }) => Promise<T>;
}

interface UseModelingPollingProps<T> {
  taskId: string;
  config: ModelingConfigBase<T>;
}

export function useModelingPolling<T>({
  taskId,
  config,
}: UseModelingPollingProps<T>) {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_generator"
  );

  const currentModeling = useAtomValue(currentModelingStore);
  const updateCurrentModeling = useSetAtom(updateCurrentModelingStore);
  const _addModelingGenerationRecord = useSetAtom(addModelingGenerationRecord);
  const updateModelViewer = useSetAtom(updateModelViewerStore);

  const [isPolling, setIsPolling] = useState(false);

  const modelingModel = currentModeling.modelingSettings.modelingModel;
  const modelingStatus = currentModeling.status;
  const modelingFormat = currentModeling.modelingSettings.modelingFormat;
  const shouldStartPolling =
    (modelingModel === "Hyper3D" || modelingModel === "Tripo3D") &&
    taskId !== "" &&
    modelingStatus === CurrentModelingStatus.PENDING;
  const hasTextures = modelingModel === "Hyper3D" && modelingFormat !== "glb";
  
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

  const fetcher = async (apiUrl: string, taskId: string) => {
    if (currentModeling.attempt >= MAX_POLLING_ATTEMPTS) {
      logger.error(EXCEEDED_MAX_POLLING_ATTEMPTS_ERROR);
      throw new Error(EXCEEDED_MAX_POLLING_ATTEMPTS_ERROR);
    }

    let data;
    try {
      data = await config.fetcher({ apiUrl, taskId });
    } catch (error) {
      logger.error(error);
      throw new Error(NORMAL_ERROR);
    }

    if (config.isFailed && config.isFailed(data)) {
      throw new Error(MODELING_FAILED_ERROR);
    }

    updateCurrentModeling({
      ...currentModeling,
      attempt: currentModeling.attempt + 1,
    });

    return data;
  };

  useSWR(
    shouldStartPolling ? [config.url, taskId] : null,
    ([apiUrl, taskId]) => fetcher(apiUrl, taskId),
    {
      refreshInterval: (latestData: any) =>
        latestData && config.isSuccess(latestData) ? 0 : 5000,
      onSuccess: async (data: any) => {
        if (config.isSuccess(data)) {
          const createAt = Date.now();
          const modelUrl = await config.getModelUrl(data);
          const textures = hasTextures ? config.getTextureUrl!(data) : [];
          
          // 保存到数据库 - 只保存模型，图片已经存在
          let modelId;
          try {
            // 使用表单中已有的imageId，不再重复保存图片
            const imageId = currentModeling.modelingSettings.imageId;
            if (imageId) {
              // 保存模型并关联到已有图片
              modelId = await saveModelToDatabase(modelUrl, imageId, currentModeling.modelingSettings);
              logger.info('Saved model to database, modelId:', modelId);
            } else {
              logger.warn('No imageId provided, model will not be associated with any image');
            }
          } catch (dbError) {
            logger.error('Error saving model to database:', dbError);
            // 即使数据库保存失败，也继续处理模型
          }
          
          if (currentModeling.taskId !== "") {
            _addModelingGenerationRecord({
              taskId: currentModeling.taskId,
              modelUrl: modelUrl,
              textures: textures,
              createAt,
              modelingForm: currentModeling.modelingSettings,
              modelId, // 添加模型ID
            });
          }
          updateCurrentModeling({
            ...currentModeling,
            attempt: 0,
            taskId: "",
            status: CurrentModelingStatus.SUCCESS,
          });
          updateModelViewer({
            modelUrl: modelUrl,
            textures: textures,
            fileType: currentModeling.modelingSettings
              .modelingFormat as SupportedFileTypes,
            modelingModel: currentModeling.modelingSettings
              .modelingModel as SupportedModelingModel,
            key: createAt,
          });
          setIsPolling(false);
          toast.success(t("toast.success"), {
            id: GLOBAL.TOAST_ID.MODELING,
          });

          logger.info("3D modeling success", data);
        }
      },
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        logger.info("retryCount", retryCount);

        if (
          error.message === EXCEEDED_MAX_POLLING_ATTEMPTS_ERROR ||
          error.message === MODELING_FAILED_ERROR ||
          retryCount >= MAX_RETRY_COUNT
        ) {
          logger.error(error.message);
          updateCurrentModeling({
            ...currentModeling,
            taskId: "",
            status: CurrentModelingStatus.FAILED,
          });
          setIsPolling(false);
          toast.error(t("toast.failed"), {
            id: GLOBAL.TOAST_ID.MODELING,
          });
          return;
        }

        setTimeout(
          () => revalidate({ retryCount }),
          Math.min(1000 * 2 ** retryCount, 30000)
        );
      },
    }
  );

  useEffect(() => {
    if (shouldStartPolling) {
      setIsPolling(true);
    }
  }, [shouldStartPolling]);

  return {
    isPolling,
    setIsPolling,
  };
}
