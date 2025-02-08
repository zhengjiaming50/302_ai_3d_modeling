"use client";

import { ImageForm } from "@/components/forms/image";
import { SampleImagesList } from "./sample-images-list";
import { ImagePreview } from "./image-preview";
import { useCallback } from "react";
import {
  imageViewerStore,
  updateImageViewerStore,
} from "@/stores/slices/image_viewer_store";
import { useAtomValue, useSetAtom } from "jotai";
import { updateImageFormAtom } from "@/stores/slices/image_form_store";

interface ImageGeneratorProps {
  onGenerated: (imageUrl: string) => void;
}

export function ImageGenerator({ onGenerated }: ImageGeneratorProps) {
  const { generatedImageUrl } = useAtomValue(imageViewerStore);
  const updateImageViewer = useSetAtom(updateImageViewerStore);
  const updateImageForm = useSetAtom(updateImageFormAtom);

  const handleSampleImageSelected = useCallback(
    (imageUrl: string, imagePrompt: string) => {
      updateImageViewer({
        generatedImageUrl: imageUrl,
      });
      updateImageForm({
        imagePrompt: imagePrompt,
      });
      onGenerated(imageUrl);
    },
    [updateImageViewer, updateImageForm, onGenerated]
  );

  return (
    <div className="flex w-full flex-col gap-y-6">
      <ImagePreview imageUrl={generatedImageUrl} />
      <SampleImagesList onSelected={handleSampleImageSelected} />
      <ImageForm />
    </div>
  );
}
