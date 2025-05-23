"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Loader2, Package, Ban } from "lucide-react";
import { ModelContainer } from "@/components/three-d/model-container";
import { SupportedFileTypes } from "@/stores/slices/model_viewer_store";
import { cn } from "@/lib/utils";
import { useErrorBoundary } from "use-error-boundary";

interface ModelPreviewProps {
  modelUrl: string;
  fileType: SupportedFileTypes;
  textures?: string[];
  className?: string;
  height?: string;
}

export function ModelPreview({
  modelUrl,
  fileType,
  textures = [],
  className,
  height = "h-32",
}: ModelPreviewProps) {
  const controlsRef = useRef<any>(null);
  const { ErrorBoundary, didCatch } = useErrorBoundary();
  const [lightIntensity, setLightIntensity] = useState(5);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [modelUrl]);

  if (!modelUrl) {
    return (
      <div className={cn("flex items-center justify-center rounded border bg-muted", height, className)}>
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
          <Package className="size-6" />
          <span className="text-xs">暂无模型</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded border bg-muted overflow-hidden", height, className)}>
      {didCatch ? (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground">
            <Ban className="size-6" />
            <span className="text-xs">加载失败</span>
          </div>
        </div>
      ) : (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            }
          >
            <Canvas
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground">
                    <Ban className="size-6" />
                    <span className="text-xs">不支持WebGL</span>
                  </div>
                </div>
              }
              camera={{ position: [3, 3, 3], fov: 25 }}
              className="cursor-grab"
            >
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={lightIntensity}
                castShadow
              />
              <directionalLight
                position={[-5, -5, 5]}
                intensity={lightIntensity * 0.5}
              />
              <ModelContainer
                modelUrl={modelUrl}
                fileType={fileType}
                textures={textures}
              />
              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={true}
                maxDistance={10.0}
                minDistance={1.0}
                autoRotate={false}
                autoRotateSpeed={2}
              />
            </Canvas>
          </Suspense>
          
          {/* 显示文件类型标识 */}
          <div className="absolute bottom-1 right-1 rounded bg-black/20 px-1 py-0.5 text-xs text-white backdrop-blur">
            {fileType?.toUpperCase()}
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
} 