"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { createScopedLogger } from "@/utils/logger";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const logger = createScopedLogger("CameraCapture");

interface CameraCaptureProps {
  onCapture: (imageBlob: Blob) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function CameraCapture({ onCapture, onClose, isOpen }: CameraCaptureProps) {
  const t = useTranslations("home.panel.image_setting_panel.camera_capture");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [streamStarted, setStreamStarted] = useState(false);
  
  // 强制重新渲染元素的状态
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (!isOpen) return;
      
      setIsLoading(true);
      setError(null);
      setVideoReady(false);
      setStreamStarted(false);
      
      try {
        logger.info("Requesting camera access...");
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false
        });
        
        // 确保stream不为null
        if (stream) {
          const videoTracksCount = stream.getVideoTracks().length;
          logger.info("Camera access granted, stream tracks:", videoTracksCount);
          setStreamStarted(true);
          
          // 短暂延迟后再设置视频源，给浏览器一些时间
          setTimeout(() => {
            if (videoRef.current && stream) {
              videoRef.current.srcObject = stream;
              setVideoKey(prev => prev + 1); // 强制重新渲染视频元素
              logger.info("Set video source object");
            } else {
              logger.error("Video ref is null when trying to set srcObject");
            }
          }, 100);
        } else {
          throw new Error("Failed to obtain media stream");
        }
        
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        logger.error("Error accessing camera:", errorMessage);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        logger.info("Stopping camera tracks:", tracks.length);
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setVideoReady(false);
      setStreamStarted(false);
    };

    if (isOpen) {
      logger.info("Camera component opened, starting camera");
      startCamera();
    }

    return () => {
      logger.info("Camera component unmounting, stopping camera");
      stopCamera();
    };
  }, [isOpen]);

  // 处理视频元素的各种事件
  const handleVideoPlay = () => {
    logger.info("Video playback started");
    setVideoReady(true);
  };
  
  const handleVideoLoad = () => {
    logger.info("Video data loaded");
    
    if (videoRef.current) {
      // 检查视频尺寸
      const { videoWidth: _videoWidth, videoHeight: _videoHeight } = videoRef.current;
      
      // 如果视频已经准备好但没有播放，尝试手动播放
      if (videoRef.current.paused) {
        logger.info("Video is paused, attempting to play");
        videoRef.current.play().catch(err => {
          logger.error("Error playing video:", err);
        });
      }
    }
  };
  
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const error = (e.target as HTMLVideoElement).error;
    const errorMsg = error ? `Video error: ${error.code} - ${error.message}` : 'Unknown video error';
    logger.error(errorMsg);
    setError(errorMsg);
  };

  // 如果视频流已经启动但视频未就绪，尝试重连
  useEffect(() => {
    if (streamStarted && !videoReady && !isLoading && !error) {
      const timer = setTimeout(() => {
        logger.info("Video not ready after stream started, forcing video element recreation");
        setVideoKey(prev => prev + 1); // 强制重新渲染视频元素
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [streamStarted, videoReady, isLoading, error]);

  const handleCapture = () => {
    if (!canvasRef.current || !videoRef.current || !videoReady) {
      logger.error("Cannot capture: video not ready or refs not available");
      return;
    }
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // 确保视频有有效的尺寸
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        logger.error("Cannot capture: video dimensions are zero");
        toast.error(t("error_invalid_video_dimensions"));
        return;
      }
      
      logger.info(`Capturing frame: ${video.videoWidth}x${video.videoHeight}`);
      
      // 设置Canvas大小为视频的实际显示大小
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // 在Canvas上绘制当前视频帧
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 将Canvas转换为Blob
        canvas.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
            logger.info("Image captured from camera");
          } else {
            logger.error("Failed to convert canvas to blob");
            toast.error(t("error_failed_to_capture"));
          }
        }, 'image/png');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error("Error during capture:", errorMessage);
      toast.error(t("error_during_capture"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative max-w-lg w-full rounded-lg overflow-hidden bg-background p-2">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-medium">{t("title")}</h3>
          
          {isLoading ? (
            <div className="h-[300px] w-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="h-[300px] w-full flex items-center justify-center flex-col gap-2">
              <p className="text-destructive">{t("error")}</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button onClick={onClose} variant="secondary">{t("close_button")}</Button>
            </div>
          ) : (
            <>
              <div className="relative w-full bg-black rounded overflow-hidden" style={{ height: '300px' }}>
                {/* 使用key强制在需要时重新创建视频元素 */}
                <video
                  key={videoKey}
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  onLoadedData={handleVideoLoad}
                  onPlay={handleVideoPlay}
                  onError={handleVideoError}
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{
                    display: videoReady ? 'block' : 'none',
                    minHeight: '300px',
                    backgroundColor: 'black'
                  }}
                />
                
                {/* 显示加载状态 */}
                {!videoReady && !isLoading && !error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                    <p className="text-sm text-muted-foreground px-4 text-center">
                      {streamStarted ? t("initializing_video") : t("connecting_camera")}
                    </p>
                  </div>
                )}
                
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex justify-center w-full pb-2">
                <Button
                  onClick={handleCapture}
                  disabled={!videoReady}
                  className={cn(
                    "rounded-full h-16 w-16 flex items-center justify-center transition-opacity duration-200",
                    !videoReady && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="rounded-full border-2 border-background h-12 w-12"></div>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 