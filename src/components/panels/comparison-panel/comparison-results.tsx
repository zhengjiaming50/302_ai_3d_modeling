"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Target, Download, Eye, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { ModelPreview } from "./model-preview";
import { SupportedFileTypes } from "@/stores/slices/model_viewer_store";

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

interface ComparisonResultsProps {
  isLoading: boolean;
  similarModels: SimilarModel[];
  uploadedImageUrl: string;
}

export function ComparisonResults({
  isLoading,
  similarModels,
  uploadedImageUrl,
}: ComparisonResultsProps) {
  const t = useTranslations("comparison");
  const [selectedModel, setSelectedModel] = useState<SimilarModel | null>(null);

  const handleModelSelect = (model: SimilarModel) => {
    setSelectedModel(model);
  };

  const handleDownloadModel = (model: SimilarModel) => {
    const downloadUrl = model.localFilePath 
      ? `/models/${model.localFilePath.split('/').pop()}` 
      : model.fileUrl;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = model.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSimilarityText = (score: number) => {
    if (score >= 80) return "高度相似";
    if (score >= 60) return "中等相似";
    return "低相似度";
  };

  // 从文件名推断文件类型
  const getFileType = (fileName: string): SupportedFileTypes => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'glb':
        return 'glb';
      case 'obj':
        return 'obj';
      case 'stl':
        return 'stl';
      default:
        return 'glb'; // 默认为glb
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {t("resultsTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">{t("searchingText")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          {t("resultsTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {similarModels.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t("noResults")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 结果统计 */}
            <div className="text-sm text-muted-foreground">
              {t("foundResults", { count: similarModels.length })}
            </div>

            {/* 模型列表 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {similarModels.map((model, index) => (
                <Card
                  key={model.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedModel?.id === model.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => handleModelSelect(model)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* 3D模型预览 */}
                      <div className="relative">
                        <ModelPreview
                          modelUrl={model.localFilePath 
                            ? `/models/${model.localFilePath.split('/').pop()}` 
                            : model.fileUrl}
                          fileType={getFileType(model.fileName)}
                          height="h-40"
                          className="w-full"
                        />
                        <Badge
                          className={`absolute top-2 right-2 text-white ${getSimilarityColor(
                            model.similarityScore
                          )}`}
                        >
                          {model.similarityScore}%
                        </Badge>
                      </div>

                      {/* 模型信息 */}
                      <div>
                        <h4 className="font-semibold text-sm truncate">
                          {model.fileName}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {getSimilarityText(model.similarityScore)}
                        </p>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadModel(model);
                          }}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          {t("download")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModelSelect(model);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 详细信息面板 */}
            {selectedModel && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">{t("modelDetails")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* 原始图片对比 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">{t("originalImages")}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("uploadedImage")}
                          </p>
                          <img
                            src={uploadedImageUrl}
                            alt="上传的图片"
                            className="w-full h-32 object-cover rounded border"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("matchedImage")}
                          </p>
                          <img
                            src={
                              selectedModel.originalImage.localFilePath
                                ? `/images/${selectedModel.originalImage.localFilePath.split('/').pop()}`
                                : selectedModel.originalImage.fileUrl
                            }
                            alt={selectedModel.originalImage.fileName}
                            className="w-full h-32 object-cover rounded border"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3D模型详情 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">{t("modelInfo")}</h4>
                      
                      {/* 大尺寸3D模型预览 */}
                      <div className="mb-4">
                        <ModelPreview
                          modelUrl={selectedModel.localFilePath 
                            ? `/models/${selectedModel.localFilePath.split('/').pop()}` 
                            : selectedModel.fileUrl}
                          fileType={getFileType(selectedModel.fileName)}
                          height="h-64"
                          className="w-full"
                        />
                      </div>

                      {/* 模型详细信息 */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("fileName")}:</span>
                          <span>{selectedModel.fileName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("similarity")}:</span>
                          <Badge className={`text-white ${getSimilarityColor(selectedModel.similarityScore)}`}>
                            {selectedModel.similarityScore}%
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("modelId")}:</span>
                          <span className="font-mono text-xs">{selectedModel.id}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4"
                        onClick={() => handleDownloadModel(selectedModel)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t("downloadModel")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 