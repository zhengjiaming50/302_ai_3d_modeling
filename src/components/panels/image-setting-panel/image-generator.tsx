"use client";

import { ImageForm } from "@/components/forms/image";
import { SampleImagesList } from "./sample-images-list";
import { ImagePreview } from "./image-preview";
import { useCallback, useEffect } from "react";
import {
  imageViewerStore,
  updateImageViewerStore,
} from "@/stores/slices/image_viewer_store";
import { useAtomValue, useSetAtom } from "jotai";
import { updateImageFormAtom } from "@/stores/slices/image_form_store";
import { createScopedLogger } from "@/utils/logger";

const logger = createScopedLogger("ImageGenerator");

interface ImageGeneratorProps {
  onGenerated: (imageUrl: string, imageId?: string) => void;
}

// 使用真实API保存图片到数据库
async function saveImageToDatabase(imageData: {
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size?: number;
}): Promise<{ id: string }> {
  try {
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save image');
    }
    
    const data = await response.json();
    return { id: data.id };
  } catch (error) {
    logger.error("Failed to save image via API:", error);
    throw error;
  }
}

export function ImageGenerator({ onGenerated }: ImageGeneratorProps) {
  const { generatedImageUrl } = useAtomValue(imageViewerStore);
  const updateImageViewer = useSetAtom(updateImageViewerStore);
  const updateImageForm = useSetAtom(updateImageFormAtom);

  const handleImageGenerated = useCallback(
    async (imageUrl: string) => {
      updateImageViewer({
        generatedImageUrl: imageUrl,
      });
      
      try {
        const imageName = `generated-${Date.now()}.png`;
        // 使用API保存图片
        const imageData = await saveImageToDatabase({
          fileName: imageName,
          fileUrl: imageUrl,
          mimeType: 'image/png',
        });
        
        logger.info("Generated image saved to database with ID:", imageData.id);
        onGenerated(imageUrl, imageData.id);
      } catch (dbError) {
        const errorMessage = 
          dbError instanceof Error ? dbError.message : "Unknown database error";
        logger.error("Failed to save generated image to database:", errorMessage);
        
        onGenerated(imageUrl);
      }
    },
    [updateImageViewer, onGenerated]
  );

  const handleSampleImageSelected = useCallback(
    async (imageUrl: string) => {
      updateImageViewer({
        generatedImageUrl: imageUrl,
      });
      
      try {
        const imageName = `sample-${Date.now()}.png`;
        // 使用API保存图片
        const imageData = await saveImageToDatabase({
          fileName: imageName,
          fileUrl: imageUrl,
          mimeType: 'image/png',
        });
        
        logger.info("Sample image saved to database with ID:", imageData.id);
        onGenerated(imageUrl, imageData.id);
      } catch (dbError) {
        const errorMessage = 
          dbError instanceof Error ? dbError.message : "Unknown database error";
        logger.error("Failed to save sample image to database:", errorMessage);
        
        onGenerated(imageUrl);
      }
    },
    [updateImageViewer, onGenerated]
  );

  useEffect(() => {
    updateImageForm({
      imagePrompt: "",
    });
  }, [updateImageForm]);

  return (
    <div className="flex flex-col gap-6">
      <ImageForm onGenerated={handleImageGenerated} />
      {generatedImageUrl && <ImagePreview imageUrl={generatedImageUrl} />}
      <SampleImagesList onSelected={handleSampleImageSelected} />
    </div>
  );
}
