"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { ImageUploader } from "@/components/panels/image-setting-panel/image-uploader";
import { ImageGenerator } from "@/components/panels/image-setting-panel/image-generator";
import { ImagePreview } from "@/components/panels/image-setting-panel/image-preview";
import { useTranslations } from "next-intl";
import { EnvironmentSampleImagesList } from "@/components/panels/image-setting-panel/environment-sample-images-list";
import { useSetAtom, useAtomValue } from "jotai";
import { imageViewerStore } from "@/stores/slices/image_viewer_store";

interface EnvironmentImageSettingPanelProps {
  onTabChange?: (tab: "imageSetting" | "imageGeneration") => void;
}

export function EnvironmentImageSettingPanel({
  onTabChange,
}: EnvironmentImageSettingPanelProps) {
  const t = useTranslations("home.panel.image_setting_panel");
  const searchParams = useSearchParams();
  const defaultTab = searchParams?.get("tab") as
    | "imageSetting"
    | "imageGeneration"
    | null;

  const [currentTab, setCurrentTab] = useState<
    "imageSetting" | "imageGeneration"
  >(defaultTab || "imageSetting");

  const setImageViewerStore = useSetAtom(imageViewerStore);
  const { uploadedImageUrl, generatedImageUrl } =
    useAtomValue(imageViewerStore);

  // 添加防止循环更新的引用
  const prevGeneratedUrl = useRef(generatedImageUrl);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(currentTab);
    }
  }, [currentTab, onTabChange]);

  const handleUpload = useCallback(
    (uploadedUrl: string) => {
      if (uploadedUrl) {
        setImageViewerStore((prev) => ({
          ...prev,
          uploadedImageUrl: uploadedUrl,
        }));
      }
    },
    [setImageViewerStore]
  );

  const handleGenerated = useCallback(
    (generatedUrl: string) => {
      // 防止重复更新同一URL导致的循环
      if (generatedUrl && generatedUrl !== prevGeneratedUrl.current) {
        prevGeneratedUrl.current = generatedUrl;
        setImageViewerStore((prev) => ({
          ...prev,
          generatedImageUrl: generatedUrl,
        }));
      }
    },
    [setImageViewerStore]
  );

  const handleEnvironmentSampleSelected = useCallback(
    (imageSrc: string, imagePrompt: string) => {
      if (imageSrc) {
        setImageViewerStore((prev) => ({
          ...prev,
          uploadedImageUrl: imageSrc,
        }));
      }
    },
    [setImageViewerStore]
  );

  return (
    <Tabs
      className="w-full"
      defaultValue={currentTab}
      onValueChange={(value) =>
        setCurrentTab(value as "imageSetting" | "imageGeneration")
      }
    >
      <TabsList className="w-full">
        <TabsTrigger value="imageSetting" className="w-1/2">
          {t("image_setting_tab.label")}
        </TabsTrigger>
        <TabsTrigger value="imageGeneration" className="w-1/2">
          {t("model_generation_tab.label")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="imageSetting" className="space-y-4 pt-4">
        <ImageUploader onUpload={handleUpload} />
        <ImagePreview imageUrl={uploadedImageUrl} />
        <EnvironmentSampleImagesList
          onSelected={handleEnvironmentSampleSelected}
        />
      </TabsContent>
      <TabsContent value="imageGeneration" className="space-y-4 pt-4">
        <ImageGenerator onGenerated={handleGenerated} />
        <ImagePreview imageUrl={generatedImageUrl} />
      </TabsContent>
    </Tabs>
  );
}
