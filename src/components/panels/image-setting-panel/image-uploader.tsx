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
  onUpload: (imageUrl: string) => void;
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const t = useTranslations("home.panel.image_setting_panel.image_uploader");

  const [isFullscreen, setIsFullscreen] = useState(false);

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
        updateImageViewer({
          uploadedImageUrl: uploadedFile.url,
        });
        onUpload(uploadedFile.url);
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
    onUpload("");
  }, [onUpload, updateImageViewer, setIsFullscreen]);

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
    (imageUrl: string) => {
      updateImageViewer({
        uploadedImageUrl: imageUrl,
      });
      onUpload(imageUrl);
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
