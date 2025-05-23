"use client";

import { ImageGenerator } from "./image-generator";
import { ImageUploader } from "./image-uploader";
import { CameraCapture } from "./camera-capture";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { updateModelingFormAtom } from "@/stores/slices/modeling_form_store";
import { useAtomValue, useSetAtom } from "jotai";
import { imageViewerStore, updateImageViewerStore } from "@/stores/slices/image_viewer_store";
import { cn } from "@/lib/utils";

const TABS_TRIGGER_CLASS =
  "relative rounded-none py-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 after:ease-out data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:w-full data-[state=active]:after:bg-primary";

interface ImageSettingPanelProps {
  onTabChange?: (tab: "imageSetting" | "imageGeneration" | "cameraCapture") => void;
}

export function ImageSettingPanel({ onTabChange }: ImageSettingPanelProps) {
  const t = useTranslations("home.panel.image_setting_panel");

  const updateModelingForm = useSetAtom(updateModelingFormAtom);
  const updateImageViewer = useSetAtom(updateImageViewerStore);
  const { uploadedImageUrl, generatedImageUrl } =
    useAtomValue(imageViewerStore);
    
  const [currentImageId, setCurrentImageId] = useState<string | undefined>(undefined);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string>("");
  const [capturedImageId, setCapturedImageId] = useState<string | undefined>(undefined);
  const [currentTab, setCurrentTab] = useState<string>("imageSetting");

  const handleImageSelected = useCallback(
    (imageUrl: string, imageId?: string) => {
      setCurrentImageId(imageId);
      updateModelingForm({ 
        imageSrc: imageUrl,
        imageId: imageId
      });
    },
    [updateModelingForm]
  );
  
  const handlePhotoCapture = useCallback(
    (imageUrl: string, imageId?: string) => {
      // 保存捕获的图片信息
      setCapturedImageUrl(imageUrl);
      setCapturedImageId(imageId);
      
      // 更新全局图片查看器状态
      updateImageViewer({
        uploadedImageUrl: imageUrl,
      });
      
      // 更新建模表单
      updateModelingForm({ 
        imageSrc: imageUrl,
        imageId: imageId
      });
      
      // 将图片ID传递给当前标签页
      setCurrentImageId(imageId);
      
      // 自动切换到图片上传标签页以便用户可以看到拍摄的照片并进行建模
      setCurrentTab("imageSetting");
    },
    [updateModelingForm, updateImageViewer]
  );

  const handleTabChange = useCallback(
    (value: string) => {
      setCurrentTab(value);
      
      if (value === "imageSetting") {
        updateModelingForm({
          imageSrc: uploadedImageUrl || capturedImageUrl,
          imageId: currentImageId || capturedImageId
        });
      } else if (value === "imageGeneration") {
        updateModelingForm({
          imageSrc: generatedImageUrl,
          imageId: undefined
        });
      } else if (value === "cameraCapture") {
        // 如果已经有拍摄的照片，使用该照片
        if (capturedImageUrl) {
          updateModelingForm({
            imageSrc: capturedImageUrl,
            imageId: capturedImageId
          });
        }
      }
      onTabChange?.(value as "imageSetting" | "imageGeneration" | "cameraCapture");
    },
    [
      updateModelingForm, 
      uploadedImageUrl, 
      generatedImageUrl, 
      capturedImageUrl,
      currentImageId,
      capturedImageId,
      onTabChange
    ]
  );

  useEffect(() => {
    onTabChange?.("imageSetting");
  }, [onTabChange]);

  return (
    <Tabs
      value={currentTab}
      defaultValue="imageSetting"
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="h-auto w-fit rounded-none bg-transparent p-0">
        <TabsTrigger className={cn(TABS_TRIGGER_CLASS)} value="imageSetting">
          {t("image_setting_tab.label")}
        </TabsTrigger>
        <TabsTrigger className={cn(TABS_TRIGGER_CLASS)} value="imageGeneration">
          {t("model_generation_tab.label")}
        </TabsTrigger>
        <TabsTrigger className={cn(TABS_TRIGGER_CLASS)} value="cameraCapture">
          {t("camera_capture_tab.label")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="imageSetting" className="pt-3">
        <ImageUploader onUpload={handleImageSelected} />
      </TabsContent>
      <TabsContent value="imageGeneration" className="pt-3">
        <ImageGenerator onGenerated={handleImageSelected} />
      </TabsContent>
      <TabsContent value="cameraCapture" className="pt-3">
        <CameraCapture onPhotoCapture={handlePhotoCapture} />
      </TabsContent>
    </Tabs>
  );
}
