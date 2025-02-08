"use client";

import { useTranslations } from "next-intl";
import { BaseRecordInterface } from "../base-record-interface";
import { ModelRecordCard } from "./model-record-card";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { useSetAtom } from "jotai";
import { useAtomValue } from "jotai";
import {
  deleteModelingGenerationRecord,
  getModelingGenerationRecords,
} from "@/stores/slices/modeling_generation_store";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateModelingFormAtom } from "@/stores/slices/modeling_form_store";
import { createScopedLogger } from "@/utils/logger";
import {
  modelViewerStore,
  resetModelViewerStore,
  SupportedFileTypes,
  SupportedModelingModel,
  updateModelViewerStore,
} from "@/stores/slices/model_viewer_store";
import JSZip from "jszip";
import saveAs from "file-saver";

const logger = createScopedLogger("ModelingGenerationRecord");

export function ModelGenerationRecord() {
  const t = useTranslations("home.dialog.modeling_generation_record");

  const { handleDownload: _handleDownload } = useMonitorMessage();

  const modelingGenerationRecords = useAtomValue(getModelingGenerationRecords);
  const displayedModel = useAtomValue(modelViewerStore);

  const _deleteModelingGenerationRecord = useSetAtom(
    deleteModelingGenerationRecord
  );
  const updateModelingForm = useSetAtom(updateModelingFormAtom);
  const updateModelViewer = useSetAtom(updateModelViewerStore);
  const resetModelViewer = useSetAtom(resetModelViewerStore);

  const [open, setOpen] = useState(false);
  const [activeModelId, setActiveModelId] = useState<number | null>(null);

  const isEmpty = modelingGenerationRecords.length === 0;

  const handleSelected = useCallback(
    ({
      imageSrc,
      modelUrl,
      textures,
      modelingFormat,
      modelingModel,
      createAt,
    }: {
      imageSrc: string;
      modelUrl: string;
      textures: string[];
      modelingFormat: SupportedFileTypes;
      modelingModel: SupportedModelingModel;
      createAt: number;
    }) => {
      updateModelingForm({ imageSrc });
      updateModelViewer({
        modelUrl,
        fileType: modelingFormat,
        textures,
        modelingModel,
        key: createAt,
      });
      setOpen(false);

      logger.info("Modeling selected:", imageSrc);
    },
    [updateModelViewer, updateModelingForm]
  );

  const handleDownload = useCallback(
    ({
      modelUrl,
      textures,
      createAt,
      modelingFormat,
    }: {
      modelUrl: string;
      textures: string[];
      createAt: number;
      modelingFormat: SupportedFileTypes;
    }) => {
      if (modelingFormat === "glb") {
        toast.promise(
          _handleDownload(modelUrl, `${createAt}.${modelingFormat}`),
          {
            loading: t("download_status.loading"),
            success: t("download_status.success"),
            error: t("download_status.error"),
          }
        );
      } else {
        const downloadZip = async () => {
          const zip = new JSZip();
          const folder = zip.folder(`${createAt}`);

          const modelResponse = await fetch(modelUrl);
          const modelBlob = await modelResponse.blob();
          folder?.file(`${createAt}.${modelingFormat}`, modelBlob);

          await Promise.all(
            textures.map(async (url, index) => {
              const response = await fetch(url);
              const blob = await response.blob();
              folder?.file(
                `${createAt}-${index}.${url.split(".").pop()}`,
                blob
              );
            })
          );

          zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, `${createAt}.zip`);
          });
        };

        toast.promise(downloadZip(), {
          loading: t("download_status.loading"),
          success: t("download_status.success"),
          error: t("download_status.error"),
        });
      }
    },
    [_handleDownload, t]
  );

  const handleDelete = useCallback(
    (createAt: number) => {
      _deleteModelingGenerationRecord(createAt);
      if (displayedModel.key === createAt) {
        resetModelViewer();
      }
    },
    [_deleteModelingGenerationRecord, displayedModel.key, resetModelViewer]
  );

  const handleShowModel = useCallback((createAt: number) => {
    setActiveModelId((prev) => (prev === createAt ? null : createAt));
  }, []);

  useEffect(() => {
    if (!open) {
      setActiveModelId(null);
    }
  }, [open]);

  return (
    <BaseRecordInterface
      isEmpty={isEmpty}
      triggerLabel={t("button_label")}
      title={t("title")}
      open={open}
      setOpen={setOpen}
    >
      {modelingGenerationRecords.map(
        ({
          modelingForm: { imageSrc, modelingFormat, modelingModel },
          modelUrl,
          textures,
          createAt,
        }) => (
          <ModelRecordCard
            imageUrl={imageSrc}
            modelUrl={modelUrl}
            textures={textures}
            modelingFormat={modelingFormat}
            modelingModel={modelingModel}
            createAt={createAt}
            key={createAt}
            onClick={() =>
              handleSelected({
                imageSrc,
                modelUrl,
                textures,
                modelingFormat,
                modelingModel,
                createAt,
              })
            }
            onDownload={() =>
              handleDownload({ modelUrl, textures, createAt, modelingFormat })
            }
            onDelete={() => handleDelete(createAt)}
            isShowModel={activeModelId === createAt}
            onShowModel={() => handleShowModel(createAt)}
          />
        )
      )}
    </BaseRecordInterface>
  );
}
