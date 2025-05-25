"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Target, Download, Calculator } from "lucide-react";
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
  const [algorithmStep, setAlgorithmStep] = useState(0);

  // 假的算法处理步骤
  const algorithmSteps = [
    "正在提取SIFT特征点...",
    "正在计算特征描述符...",
    "正在使用KD-Tree构建索引...",
    "正在执行FLANN匹配算法...",
    "正在计算余弦相似度...",
    "正在应用阈值过滤...",
    "正在生成相似度排序..."
  ];

  useEffect(() => {
    if (isLoading) {
      setAlgorithmStep(0);
      const interval = setInterval(() => {
        setAlgorithmStep((prev: number) => (prev + 1) % algorithmSteps.length);
      }, 800); // 每800ms切换一个步骤

      return () => clearInterval(interval);
    }
  }, [isLoading, algorithmSteps.length]);

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
            <Calculator className="h-5 w-5" />
            {t("resultsTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-center">
              {t("searchingText")}
            </p>
            <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
              <span className="font-mono">{algorithmSteps[algorithmStep]}</span>
            </div>
            <div className="w-full max-w-md bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((algorithmStep + 1) / algorithmSteps.length) * 100}%` }}
              />
            </div>
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
                  className="transition-all hover:shadow-md"
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

                      {/* 下载按钮 */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDownloadModel(model)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {t("download")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 