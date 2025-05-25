"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploader } from "@/components/forms/image-uploader/image-uploader";
import { CameraCapture } from "@/components/panels/image-setting-panel/camera-capture";
import { Loader2, Search, Image as ImageIcon, Upload, Camera } from "lucide-react";
import { ComparisonResults } from "./comparison-results";

interface SimilarModel {
  id: string;
  imageId: string;
  fileName: string;
  fileUrl: string;
  localFilePath?: string;
  similarityScore: number;
  originalImage: {
    id: string;
    fileName: string;
    fileUrl: string;
    localFilePath?: string;
  };
}

export function ComparisonPanel() {
  const t = useTranslations("comparison");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadedImageId, setUploadedImageId] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [similarModels, setSimilarModels] = useState<SimilarModel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("upload");

  const handleImageUpload = (imageUrl: string, imageId?: string) => {
    setUploadedImageUrl(imageUrl);
    setUploadedImageId(imageId || "");
    // 重置搜索状态
    setSimilarModels([]);
    setHasSearched(false);
  };

  const handlePhotoCapture = (imageUrl: string, imageId?: string) => {
    setUploadedImageUrl(imageUrl);
    setUploadedImageId(imageId || "");
    // 重置搜索状态
    setSimilarModels([]);
    setHasSearched(false);
  };

  const handleSearchSimilar = async () => {
    if (!uploadedImageUrl || !uploadedImageId) return;

    setIsSearching(true);
    try {
      const response = await fetch("/api/comparisons/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: uploadedImageId,
          imageUrl: uploadedImageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("搜索失败");
      }

      const data = await response.json();
      setSimilarModels(data.similarModels || []);
      setHasSearched(true);
    } catch (error) {
      console.error("搜索相似模型时出错:", error);
      // 可以添加错误提示
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 图片上传/拍照区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            {t("uploadTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {t("uploadTab")}
                </TabsTrigger>
                <TabsTrigger value="camera" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  {t("cameraTab")}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4">
                <ImageUploader onUpload={handleImageUpload} />
              </TabsContent>
              
              <TabsContent value="camera" className="space-y-4">
                <CameraCapture onPhotoCapture={handlePhotoCapture} />
              </TabsContent>
            </Tabs>
            
            {uploadedImageUrl && (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={uploadedImageUrl}
                    alt="上传的图片"
                    className="max-h-64 max-w-full rounded-lg border object-contain"
                  />
                </div>
                
                <Button
                  onClick={handleSearchSimilar}
                  disabled={isSearching}
                  className="w-full max-w-md"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("searching")}
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      {t("searchSimilar")}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 搜索结果区域 */}
      {(hasSearched || isSearching) && (
        <ComparisonResults
          isLoading={isSearching}
          similarModels={similarModels}
          uploadedImageUrl={uploadedImageUrl}
        />
      )}
    </div>
  );
} 