"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileDown } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function ModelViewerPage() {
  const searchParams = useSearchParams();
  const modelPath = searchParams.get("path");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileName = modelPath ? modelPath.split(/[\\\/]/).pop() : "未知模型";
  
  // 测试用的硬编码模型URL (使用示例模型)
  // 在实际使用中，您应该把文件放在公共目录下，然后直接引用
  const demoModelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  
  // 使用我们知道有效的模型URL
  const effectiveModelUrl = modelPath && modelPath.startsWith("http") ? modelPath : demoModelUrl;
  
  // 在脚本加载完成后尝试加载模型
  useEffect(() => {
    if (scriptLoaded) {
      const modelViewerElement = document.querySelector('model-viewer');
      if (modelViewerElement) {
        modelViewerElement.addEventListener('error', () => {
          setError('无法加载模型。请尝试下载文件后在本地查看器中打开。');
        });
      }
    }
  }, [scriptLoaded]);
  
  return (
    <>
      {/* 加载model-viewer组件脚本 */}
      <Script 
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        onLoad={() => setScriptLoaded(true)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/comparison" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              返回对比分析
            </Link>
            
            {modelPath && (
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center"
                onClick={() => window.open(modelPath, '_blank')}
              >
                <FileDown className="mr-1 h-4 w-4" />
                下载模型文件
              </Button>
            )}
          </div>
          
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted">
              <h1 className="text-xl font-semibold">3D模型查看器 - {fileName}</h1>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full" style={{ height: "70vh" }}>
                {!scriptLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <div className="text-lg text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-2"></div>
                      <p>加载查看器组件中...</p>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                    <div className="text-red-500 text-lg text-center p-8">
                      <p>{error}</p>
                      <p className="text-sm mt-2">请尝试下载文件后在本地查看器中打开</p>
                    </div>
                  </div>
                )}
                
                {/* 使用model-viewer Web组件显示3D模型 */}
                <model-viewer
                  src={effectiveModelUrl}
                  alt="3D模型"
                  camera-controls
                  auto-rotate
                  shadow-intensity="1"
                  environment-image="neutral"
                  exposure="0.75"
                  style={{ width: "100%", height: "100%" }}
                ></model-viewer>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>操作提示：</p>
            <ul className="list-disc list-inside ml-2">
              <li>鼠标左键：旋转模型</li>
              <li>鼠标右键：平移视图</li>
              <li>滚轮：缩放</li>
              <li>双击：重置视图</li>
            </ul>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-700">提示：如果您无法在此查看器中查看模型，请尝试以下方法：</p>
              <ol className="list-decimal list-inside mt-1 ml-2 text-yellow-600">
                <li>确保您的浏览器支持WebGL</li>
                <li>点击&quot;下载模型文件&quot;按钮，将文件保存到您的计算机</li>
                <li>使用专门的3D查看器应用程序（如Windows 3D查看器）打开模型文件</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 