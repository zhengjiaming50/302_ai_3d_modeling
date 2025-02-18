/* eslint-disable camelcase */
import { GLOBAL } from "@/constants";
import { convertModel } from "@/services/model-convertion";
import {
  modelViewerStore,
  SupportedFileTypes,
} from "@/stores/slices/model_viewer_store";
import { createScopedLogger } from "@/utils/logger";
import { useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import useSWR from "swr";
import JSZip from "jszip";
import { useUnifiedFileUpload } from "@/hooks/global/use-unified-file-upload";
import { toast } from "sonner";
import saveAs from "file-saver";
import { useTranslations } from "next-intl";

const logger = createScopedLogger("useModelConverter");

const FORMAT_CONVERTER_URL = "302/3d/format_convert";

export function useModelConverter() {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_preview"
  );

  const { upload, isUploading } = useUnifiedFileUpload();

  const currentView = useAtomValue(modelViewerStore);
  const { modelUrl, textures, key, fileType } = currentView;

  const typeList = GLOBAL.MODELING_FORMAT_OPTIONS.filter(
    (type) => type !== currentView.fileType
  );
  const disabled = currentView.modelUrl === "";

  const [targetType, setTargetType] = useState<SupportedFileTypes>(typeList[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [startConvert, setStartConvert] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const getZipFile = async () => {
    const zip = new JSZip();
    const folder = zip.folder(`${key}`);

    try {
      const modelResponse = await fetch(modelUrl);
      if (!modelResponse.ok) {
        throw new Error("Failed to fetch model file");
      }
      const modelBlob = await modelResponse.blob();
      folder?.file(`${key}.${fileType}`, modelBlob);

      await Promise.all(
        textures.map(async (url, index) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch texture: ${url}`);
          }
          const blob = await response.blob();
          folder?.file(`${key}-${index}.${url.split(".").pop()}`, blob);
        })
      );

      const zipBlob = await zip.generateAsync({ type: "blob" });
      // Convert Blob to File
      return new File([zipBlob], `${key}.zip`, { type: "application/zip" });
    } catch (error) {
      logger.error("Failed to create zip file:", error);
      toast.error(t("errors.failedToCreateZipFolder"));
    }
  };

  const fetcher = async (apiUrl: string) => {
    let data;
    try {
      const zipFile = await getZipFile();
      if (!zipFile) {
        throw new Error("Failed to create zip file");
      }

      const [uploadedFile] = await upload([zipFile]);
      if (!uploadedFile?.url) {
        throw new Error("Failed to upload model files");
      }

      data = await convertModel({
        apiUrl,
        modelZipUrl: uploadedFile.url,
        targetType,
      });
    } catch (error) {
      throw error;
    }

    return data;
  };

  const { isLoading } = useSWR(
    startConvert ? [FORMAT_CONVERTER_URL] : null,
    () => fetcher(FORMAT_CONVERTER_URL),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data) {
          setDownloading(true);

          const { models_urls, textures_urls } = data;

          const downloadZip = async () => {
            const zip = new JSZip();
            const folder = zip.folder(`${key}`);

            await Promise.all([
              ...textures_urls.map(async (url, index) => {
                const response = await fetch(url);
                const blob = await response.blob();
                folder?.file(`${key}-${index}.${url.split(".").pop()}`, blob);
              }),
              ...models_urls.map(async (url) => {
                const response = await fetch(url);
                const blob = await response.blob();
                folder?.file(`${key}.${url.split(".").pop()}`, blob);
              }),
            ]);

            zip.generateAsync({ type: "blob" }).then((content) => {
              saveAs(content, `${key}.zip`);
            });

            setDownloading(false);
            setStartConvert(false);
          };

          toast.promise(downloadZip(), {
            loading: t("download_status.loading"),
            success: t("download_status.success"),
            error: t("download_status.error"),
          });
        }
      },
      onError: (error) => {
        setStartConvert(false);
        logger.error("Model conversion failed:", error);
        toast.error(t("errors.failedToCreateZipFolder"));
      },
    }
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (disabled) return;
      setIsOpen(open);
    },
    [disabled]
  );

  const handleConvert = useCallback((type: SupportedFileTypes) => {
    setTargetType(type);
    setStartConvert(true);
    setIsOpen(false);
    logger.info(`handleConvert: ${type}`);
  }, []);

  const converting = isLoading || isUploading || downloading || startConvert;

  return {
    isOpen,
    typeList,
    disabled,
    converting,

    handleOpenChange,
    handleConvert,
  };
}
