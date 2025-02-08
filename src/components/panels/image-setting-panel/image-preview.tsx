"use client";

/* eslint-disable @next/next/no-img-element */
import { ActionGroup } from "@/components/action-group/action-group";
import { Label } from "@/components/ui/label";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { cn } from "@/lib/utils";
import { updateImageViewerStore } from "@/stores/slices/image_viewer_store";
import { updateModelingFormAtom } from "@/stores/slices/modeling_form_store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  const t = useTranslations("home.panel.image_setting_panel.image_preview");

  const updateImageViewer = useSetAtom(updateImageViewerStore);
  const updateModelingForm = useSetAtom(updateModelingFormAtom);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const { handleDownload: _handleDownload } = useMonitorMessage();

  const handleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const handleDownload = useCallback(
    (imageUrl: string) =>
      toast.promise(_handleDownload(imageUrl, `${Date.now()}.png`), {
        loading: t("download_status.loading"),
        success: t("download_status.success"),
        error: t("download_status.error"),
      }),
    [_handleDownload, t]
  );

  const handleDelete = useCallback(() => {
    setIsFullscreen(false);
    updateImageViewer({
      generatedImageUrl: "",
    });
    updateModelingForm({
      imageSrc: "",
    });
  }, [updateImageViewer, updateModelingForm]);

  return (
    <div className="flex flex-col gap-y-2">
      <Label>{t("label")}</Label>
      <div
        className={cn(
          "group relative flex items-center justify-center rounded-lg border border-border bg-muted p-2",
          imageUrl ? "border-primary" : "",
          isFullscreen
            ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none"
            : "h-[300px]"
        )}
      >
        {imageUrl ? (
          <>
            <ActionGroup
              className="hidden group-hover:block"
              onDownload={() => handleDownload(imageUrl)}
              onDelete={handleDelete}
              onFullscreen={handleFullscreen}
              isFullscreen={isFullscreen}
            />
            <img
              src={imageUrl}
              alt="Image Preview"
              className="h-full w-full object-contain"
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
            <ImagePlus className="size-8" />
            <span>{t("placeholder")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
