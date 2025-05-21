"use client";

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { createScopedLogger } from "@/utils/logger";
import { useUnifiedFileUpload } from "@/hooks/global/use-unified-file-upload";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Loader2, ImageUp } from "lucide-react";
import { cn, convertToPng } from "@/lib/utils";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { ActionGroup } from "@/components/action-group/action-group";
import { SampleImagesList } from "./sample-images-list";
import {
  imageViewerStore,
  updateImageViewerStore,
} from "@/stores/slices/image_viewer_store";
import { useAtomValue, useSetAtom } from "jotai";

const logger = createScopedLogger("ImageUploader");

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

interface ImageUploaderProps {
  onUpload: (imageUrl: string, imageId?: string) => void;
}

// 使用真实API保存图片到数据库
async function saveImageToDatabase(imageData: {
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size?: number;
}): Promise<{ id: string }> {
  try {
    const response = await fetch("/api/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save image");
    }

    const data = await response.json();
    return { id: data.id };
  } catch (error) {
    logger.error("Failed to save image via API:", error);
    throw error;
  }
}

// 使用AI标注图片
async function tagImageWithAI(
  imageId: string,
  imageUrl: string
): Promise<void> {
  try {
    const response = await fetch("/api/images/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageId, imageUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to tag image");
    }

    logger.info("Image tagged successfully with AI:", imageId);
  } catch (error) {
    logger.error("Failed to tag image with AI:", error);
    // 不抛出错误，让上传过程继续
  }
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const t = useTranslations("home.panel.image_setting_panel.image_uploader");

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);

  const { uploadedImageUrl } = useAtomValue(imageViewerStore);
  const updateImageViewer = useSetAtom(updateImageViewerStore);

  const { handleDownload: _handleDownload } = useMonitorMessage();

  const { upload, isUploading } = useUnifiedFileUpload();

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error(t("error.invalid_file_type"));
        logger.error("Invalid file type. Please upload an image file.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(t("error.file_too_large"));
        logger.error(
          `File size ${file.size} exceeds limit of ${MAX_FILE_SIZE}`
        );
        return;
      }

      try {
        const fileToUpload =
          file.type !== "image/png" ? await convertToPng(file) : file;
        const [uploadedFile] = await upload([fileToUpload]);

        try {
          // 使用API保存图片数据
          const imageData = await saveImageToDatabase({
            fileName: fileToUpload.name,
            fileUrl: uploadedFile.url,
            mimeType: fileToUpload.type,
            size: fileToUpload.size,
          });

          setCurrentImageId(imageData.id);
          updateImageViewer({
            uploadedImageUrl: uploadedFile.url,
          });
          onUpload(uploadedFile.url, imageData.id);
          logger.info("Image saved to database with ID:", imageData.id);

          // 使用AI标注图片
          await tagImageWithAI(imageData.id, uploadedFile.url);
        } catch (dbError) {
          const errorMessage =
            dbError instanceof Error
              ? dbError.message
              : "Unknown database error";
          logger.error("Failed to save image to database:", errorMessage);

          updateImageViewer({
            uploadedImageUrl: uploadedFile.url,
          });
          onUpload(uploadedFile.url);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        toast.error(t("error.upload_failed"));
        logger.error("Upload failed:", errorMessage);
      }
    },
    [t, upload, onUpload, updateImageViewer]
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            handleImageUpload(file);
            break;
          }
        }
      }
    },
    [handleImageUpload]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDelete = useCallback(() => {
    setIsFullscreen(false);
    updateImageViewer({
      uploadedImageUrl: "",
    });
    setCurrentImageId(null);
    onUpload("");
    logger.info("Image deleted, cleared currentImageId:", currentImageId);
  }, [onUpload, updateImageViewer, setIsFullscreen, currentImageId]);

  const handleDownload = useCallback(
    (imageUrl: string) =>
      toast.promise(_handleDownload(imageUrl, `${Date.now()}.png`), {
        loading: t("download_status.loading"),
        success: t("download_status.success"),
        error: t("download_status.error"),
      }),
    [_handleDownload, t]
  );

  const handleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const handleSampleImageSelected = useCallback(
    async (imageUrl: string) => {
      updateImageViewer({
        uploadedImageUrl: imageUrl,
      });

      try {
        const imageName = `sample-${Date.now()}.png`;
        // 使用API保存图片数据
        const imageData = await saveImageToDatabase({
          fileName: imageName,
          fileUrl: imageUrl,
          mimeType: "image/png",
        });

        setCurrentImageId(imageData.id);
        onUpload(imageUrl, imageData.id);
        logger.info("Sample image saved to database with ID:", imageData.id);

        // 使用AI标注示例图片
        await tagImageWithAI(imageData.id, imageUrl);
      } catch (dbError) {
        const errorMessage =
          dbError instanceof Error ? dbError.message : "Unknown database error";
        logger.error("Failed to save sample image to database:", errorMessage);

        onUpload(imageUrl);
      }
    },
    [onUpload, updateImageViewer]
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <Label>{t("label")}</Label>
        <div
          className={cn(
            "group relative flex items-center justify-center rounded-lg border border-dashed border-border bg-muted p-2",
            uploadedImageUrl
              ? "border-primary"
              : "transition-all duration-100 hover:border-primary",
            isFullscreen
              ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none"
              : "h-[300px]"
          )}
        >
          {uploadedImageUrl ? (
            <>
              <ActionGroup
                className="hidden group-hover:block"
                onDownload={() => handleDownload(uploadedImageUrl)}
                onDelete={handleDelete}
                onFullscreen={handleFullscreen}
                isFullscreen={isFullscreen}
              />
              <img
                className="h-full w-full object-contain"
                src={uploadedImageUrl}
                alt="Image"
              />
            </>
          ) : (
            <>
              {isUploading ? (
                <Loader2 className="size-8 animate-spin text-primary" />
              ) : (
                <div
                  className="relative flex h-full w-full items-center justify-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
                    <ImageUp className="size-8" />
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-center">{t("placeholder_1")}</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    title=""
                    multiple={false}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <SampleImagesList onSelected={handleSampleImageSelected} />
    </div>
  );
}
