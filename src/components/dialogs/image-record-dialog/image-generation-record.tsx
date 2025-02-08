"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import {
  deleteImageGenerationRecord,
  getImageGenerationRecords,
} from "@/stores/slices/image_generation_store";
import { useAtomValue, useSetAtom } from "jotai";
import { updateImageFormAtom } from "@/stores/slices/image_form_store";
import { createScopedLogger } from "@/utils/logger";
import { toast } from "sonner";
import { ImageRecordCard } from "./image-record-card";
import { BaseRecordInterface } from "@/components/dialogs/base-record-interface";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { updateImageViewerStore } from "@/stores/slices/image_viewer_store";
import { updateModelingFormAtom } from "@/stores/slices/modeling_form_store";
const logger = createScopedLogger("ImageGenerationRecord");

export function ImageGenerationRecord() {
  const t = useTranslations("home.dialog.image_generation_record");

  const { handleDownload: _handleDownload } = useMonitorMessage();

  const imageGenerationRecords = useAtomValue(getImageGenerationRecords);
  const updateImageViewer = useSetAtom(updateImageViewerStore);
  const updateModelingForm = useSetAtom(updateModelingFormAtom);
  const _deleteImageGenerationRecord = useSetAtom(deleteImageGenerationRecord);
  const updateImageForm = useSetAtom(updateImageFormAtom);

  const [open, setOpen] = useState(false);

  const isEmpty = imageGenerationRecords.length === 0;

  const handleSelected = useCallback(
    (imageSrc: string, imagePrompt: string) => {
      updateImageViewer({
        generatedImageUrl: imageSrc,
      });
      updateModelingForm({ imageSrc });
      updateImageForm({ imagePrompt });
      setOpen(false);

      logger.info("Image selected:", imageSrc, imagePrompt);
    },
    [updateImageViewer, updateModelingForm, updateImageForm]
  );

  const handleDownload = useCallback(
    (imageSrc: string, createAt: number) =>
      toast.promise(_handleDownload(imageSrc, `${createAt}.png`), {
        loading: t("download_status.loading"),
        success: t("download_status.success"),
        error: t("download_status.error"),
      }),
    [_handleDownload, t]
  );

  const handleDelete = useCallback(
    (createAt: number) => _deleteImageGenerationRecord(createAt),
    [_deleteImageGenerationRecord]
  );

  return (
    <BaseRecordInterface
      isEmpty={isEmpty}
      triggerLabel={t("button_label")}
      title={t("title")}
      open={open}
      setOpen={setOpen}
    >
      {imageGenerationRecords.map(({ imageSrc, createAt, imagePrompt }) => (
        <ImageRecordCard
          imageSrc={imageSrc}
          createAt={createAt}
          key={createAt}
          onClick={() => {
            handleSelected(imageSrc, imagePrompt);
          }}
          onDownload={() => handleDownload(imageSrc, createAt)}
          onDelete={() => handleDelete(createAt)}
        />
      ))}
    </BaseRecordInterface>
  );
}
