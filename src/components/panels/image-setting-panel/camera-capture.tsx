"use client";

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { createScopedLogger } from "@/utils/logger";
import { useUnifiedFileUpload } from "@/hooks/global/use-unified-file-upload";
import { Camera, Loader2, RefreshCw } from "lucide-react";
import { ActionGroup } from "@/components/action-group/action-group";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import { cn } from "@/lib/utils";

const logger = createScopedLogger("CameraCapture");

// 将base64数据转换为File对象
function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// 使用真实API保存图片到数据库（复用现有逻辑）
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

interface CameraCaptureProps {
  onPhotoCapture: (imageUrl: string, imageId?: string) => void;
}

export function CameraCapture({ onPhotoCapture }: CameraCaptureProps) {
  const t = useTranslations("home.panel.image_setting_panel.camera_capture");
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedImageId, setCapturedImageId] = useState<string | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { upload } = useUnifiedFileUpload();
  const { handleDownload: _handleDownload } = useMonitorMessage();
  
  // 处理媒体设备错误
  const handleUserMediaError = useCallback((error: string | DOMException) => {
    logger.error("Camera access error:", error);
    toast.error(t("error.camera_access_failed"));
    setIsCameraReady(false);
  }, [t]);

  // 处理媒体设备成功连接
  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
    logger.info("Camera ready");
  }, []);

  // 重新开始拍照（放弃当前照片）
  const restartCamera = useCallback(() => {
    setCapturedImage(null);
    setCapturedImageId(undefined);
  }, []);

  // 下载照片
  const handleDownload = useCallback(
    (imageUrl: string) =>
      toast.promise(_handleDownload(imageUrl, `camera-${Date.now()}.png`), {
        loading: t("download_status.loading"),
        success: t("download_status.success"),
        error: t("download_status.error"),
      }),
    [_handleDownload, t]
  );

  // 处理全屏切换
  const handleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // 拍照并上传
  const capture = useCallback(async () => {
    if (!webcamRef.current || !isCameraReady) return;
    
    try {
      setIsCapturing(true);
      // 获取截图
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        toast.error(t("error.photo_capture_failed"));
        setIsCapturing(false);
        return;
      }
      
      // 将base64图片转换为文件对象
      const filename = `camera-${Date.now()}.png`;
      const file = dataURLtoFile(imageSrc, filename);
      
      // 使用现有上传功能上传图片
      const [uploadedFile] = await upload([file]);
      
      try {
        // 保存图片到数据库
        const imageData = await saveImageToDatabase({
          fileName: file.name,
          fileUrl: uploadedFile.url,
          mimeType: file.type,
          size: file.size
        });
        
        // 保存到组件状态
        setCapturedImage(uploadedFile.url);
        setCapturedImageId(imageData.id);
        
        // 返回给父组件
        onPhotoCapture(uploadedFile.url, imageData.id);
        logger.info("Camera photo saved to database with ID:", imageData.id);
        toast.success(t("success.photo_captured"));
      } catch (dbError) {
        const errorMessage = 
          dbError instanceof Error ? dbError.message : "Unknown database error";
        logger.error("Failed to save camera photo to database:", errorMessage);
        
        // 即使数据库保存失败，仍然设置预览
        setCapturedImage(uploadedFile.url);
        
        // 即使数据库保存失败，仍然返回图片URL
        onPhotoCapture(uploadedFile.url);
        toast.error(t("error.save_failed"));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(t("error.photo_capture_failed"));
      logger.error("Failed to capture photo:", errorMessage);
    } finally {
      setIsCapturing(false);
    }
  }, [isCameraReady, upload, onPhotoCapture, t]);
  
  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className={cn(
        "relative border rounded-lg overflow-hidden aspect-video",
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none" : ""
      )}>
        {capturedImage ? (
          // 显示拍摄的照片
          <div className="relative h-full w-full group">
            <ActionGroup
              className="hidden group-hover:block absolute top-2 right-2 z-10"
              onDownload={() => handleDownload(capturedImage)}
              onDelete={restartCamera}
              onFullscreen={handleFullscreen}
              isFullscreen={isFullscreen}
            />
            <img
              src={capturedImage}
              alt="Captured photo"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          // 显示摄像头视频流
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/png"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user"
              }}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              className="w-full h-full object-cover"
            />
            
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="flex flex-col items-center space-y-2">
                  <Camera className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{t("initializing")}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {capturedImage ? (
        <div className="flex space-x-2">
          <Button 
            onClick={restartCamera}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("retake_photo")}
          </Button>
          <Button 
            onClick={() => {
              // 确保图片已被设置用于建模
              if (capturedImage) {
                onPhotoCapture(capturedImage, capturedImageId);
                toast.success(t("success.photo_selected"));
              }
            }}
            className="flex-1"
          >
            {t("use_for_modeling")}
          </Button>
        </div>
      ) : (
        <Button 
          onClick={capture}
          disabled={!isCameraReady || isCapturing}
          className="w-full"
        >
          {isCapturing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("capturing")}
            </>
          ) : (
            t("take_photo")
          )}
        </Button>
      )}
    </div>
  );
} 