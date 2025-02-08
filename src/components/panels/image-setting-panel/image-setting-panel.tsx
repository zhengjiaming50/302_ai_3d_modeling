"use client";

import { ImageGenerator } from "./image-generator";
import { ImageUploader } from "./image-uploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { updateModelingFormAtom } from "@/stores/slices/modeling_form_store";
import { useAtomValue, useSetAtom } from "jotai";
import { imageViewerStore } from "@/stores/slices/image_viewer_store";

interface ImageSettingPanelProps {
  onTabChange?: (tab: "imageSetting" | "imageGeneration") => void;
}

export function ImageSettingPanel({ onTabChange }: ImageSettingPanelProps) {
  const t = useTranslations("home.panel.image_setting_panel");

  const updateModelingForm = useSetAtom(updateModelingFormAtom);
  const { uploadedImageUrl, generatedImageUrl } =
    useAtomValue(imageViewerStore);

  const handleImageSelected = useCallback(
    (imageUrl: string) => {
      updateModelingForm({ imageSrc: imageUrl });
    },
    [updateModelingForm]
  );

  const handleTabChange = useCallback(
    (value: string) => {
      updateModelingForm({
        imageSrc:
          value === "imageSetting" ? uploadedImageUrl : generatedImageUrl,
      });
      onTabChange?.(value as "imageSetting" | "imageGeneration");
    },
    [updateModelingForm, uploadedImageUrl, generatedImageUrl, onTabChange]
  );

  useEffect(() => {
    onTabChange?.("imageSetting");
  }, [onTabChange]);

  return (
    <Tabs
      defaultValue="imageSetting"
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="flex w-full">
        <TabsTrigger
          className="flex w-full items-center justify-center"
          value="imageSetting"
        >
          {t("image_setting_tab.label")}
        </TabsTrigger>
        <TabsTrigger
          className="flex w-full items-center justify-center"
          value="imageGeneration"
        >
          {t("model_generation_tab.label")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="imageSetting" className="pt-3">
        <ImageUploader onUpload={handleImageSelected} />
      </TabsContent>
      <TabsContent value="imageGeneration" className="pt-3">
        <ImageGenerator onGenerated={handleImageSelected} />
      </TabsContent>
    </Tabs>
  );
}
