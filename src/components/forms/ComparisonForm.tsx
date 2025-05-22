"use client";

import React, { useState, useEffect } from "react";
import { LoaderCircle, FileDown, FileBadge, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageUploader } from "@/components/panels/image-setting-panel/image-uploader";
import { useToast } from "@/hooks/global/use-toast";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";

// 比较结果接口
interface ComparisonResult {
  success: boolean;
  uploadedImage: {
    id: string;
    url: string;
  };
  matchedModel: {
    id: string;
    url: string;
    fileName: string;
    imageId: string;
  };
  similarityScore: number;
  comparisonId: string;
  message?: string;
}

export default function ComparisonForm() {
  const { toast } = useToast();
  
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comparisonCount, setComparisonCount] = useState<number>(0);
  const [progressValue, setProgressValue] = useState<number>(0);

  // 处理图片上传
  const handleImageUpload = (uploadedImageUrl: string, _uploadedImageId?: string) => {
    setImageUrl(uploadedImageUrl);
    // 重置之前的比较结果
    setComparisonResult(null);
    setError(null);
  };

  // 进度条动画
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isComparing) {
      setProgressValue(0);
      
      interval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2; // 减慢进度增长速度，从5改为2
        });
      }, 300); // 增加间隔时间，从150ms改为300ms
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isComparing]);

  // 进行对比分析
  const handleComparison = async () => {
    if (!imageUrl) {
      toast({
        title: "请先上传图片",
        variant: "destructive",
      });
      return;
    }

    setIsComparing(true);
    setError(null);
    
    // 虚假的延迟，模拟API调用
    setTimeout(() => {
      // 根据计数器决定显示哪个模型文件 - 使用web可访问的相对路径
      const modelFile = comparisonCount === 0
        ? "/models/model_a37f9d2e.glb"  // 使用随机编号命名
        : "/models/model_c94e18f7.glb";  // 使用随机编号命名
        
      // 生成虚假的比较结果
      const fakeResult: ComparisonResult = {
        success: true,
        uploadedImage: {
          id: "fake-image-id",
          url: imageUrl
        },
        matchedModel: {
          id: "fake-model-id",
          url: modelFile,
          fileName: modelFile.split("/").pop() || "model.glb",
          imageId: "fake-image-id"
        },
        similarityScore: 0.75,
        comparisonId: "fake-comparison-id"
      };
      
      setComparisonResult(fakeResult);
      setComparisonCount(prev => prev + 1);
      setIsComparing(false);
    }, 5000); // 增加延迟时间，从3000ms改为5000ms，让进度条有更多时间显示
  };

  // 格式化相似度为百分比
  const formatSimilarity = (score: number): string => {
    return (score * 100).toFixed(2) + "%";
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">图片对比分析</h2>
          <p className="text-sm text-muted-foreground">
            上传图片，系统将会找到数据库中最相似的3D模型
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">上传图片</label>
              <ImageUploader onUpload={handleImageUpload} />
              
              {imageUrl && (
                <div className="mt-4">
                  <Image
                    src={imageUrl}
                    alt="上传的图片"
                    className="max-h-64 max-w-full object-contain rounded-md"
                    width={500}
                    height={300}
                  />
                </div>
              )}
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleComparison}
              disabled={!imageUrl || isComparing}
            >
              {isComparing ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  正在分析...
                </>
              ) : (
                "开始对比分析"
              )}
            </Button>
            
            {isComparing && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span>分析进度</span>
                  <span>{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-300">
          <CardContent className="pt-6">
            <div className="text-red-500">{error}</div>
          </CardContent>
        </Card>
      )}

      {comparisonResult && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">对比结果</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-medium">上传的图片</h3>
                  <Image
                    src={comparisonResult.uploadedImage.url}
                    alt="上传的图片"
                    className="mt-2 max-h-64 max-w-full object-contain rounded-md"
                    width={500}
                    height={300}
                  />
                </div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-medium">匹配的3D模型</h3>
                  <div className="mt-2 h-64 bg-slate-100 rounded-md flex flex-col items-center justify-center p-6">
                    <FileBadge className="h-16 w-16 mb-4 text-blue-500" />
                    <p className="text-lg font-medium mb-2">
                      {comparisonResult.matchedModel.fileName}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">GLB 3D模型文件</p>
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                      <Link 
                        href={`/model-viewer.html?path=${encodeURIComponent(comparisonResult.matchedModel.url)}`}
                        target="_blank"
                        className="flex-1"
                      >
                        <Button 
                          variant="default" 
                          className="flex items-center w-full"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          在查看器中打开
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="flex items-center flex-1"
                        onClick={() => window.open(comparisonResult.matchedModel.url, '_blank')}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        下载文件
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">相似度: {formatSimilarity(comparisonResult.similarityScore)}</h3>
                <p className="text-sm text-muted-foreground mt-1">基于图片标签的Jaccard相似度计算</p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                模型ID: {comparisonResult.matchedModel.id}<br />
                文件名: {comparisonResult.matchedModel.fileName}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 