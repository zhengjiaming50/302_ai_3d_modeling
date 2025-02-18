/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense, useCallback, useState, useRef, useMemo } from "react";
import { BaseRecordCard } from "../base-record-card";
import { OrbitControls } from "@react-three/drei";
import { Loader2 } from "lucide-react";
import { ModelContainer } from "../../three-d/model-container";
import { Canvas } from "@react-three/fiber";
import {
  SupportedModelingModel,
  SupportedFileTypes,
} from "@/stores/slices/model_viewer_store";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { useErrorBoundary } from "use-error-boundary";

interface ModelRecordCardProps {
  imageUrl: string;
  modelUrl: string;
  textures: string[];
  modelingFormat: SupportedFileTypes;
  modelingModel: SupportedModelingModel;
  createAt: number;
  onClick: () => void;
  onDownload: () => void;
  onDelete: () => void;
  isShowModel: boolean;
  onShowModel: () => void;
}
export function ModelRecordCard({
  imageUrl,
  modelUrl,
  modelingFormat,
  modelingModel,
  textures,
  createAt,
  onClick,
  onDownload,
  onDelete,
  isShowModel,
  onShowModel,
}: ModelRecordCardProps) {
  const isMobile = useIsMobile();

  const [isHovered, setIsHovered] = useState(false);
  const { ErrorBoundary, didCatch } = useErrorBoundary();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const showModel = isMobile ? isShowModel : isHovered;

  const lightIntensity = useMemo(() => {
    switch (modelingModel) {
      case "Trellis":
        return 10;
      case "Tripo3D":
        return 7;
      case "Hyper3D":
        return 1;
      case "StableFast3D":
        return 1;
      case "StablePoint3D":
        return 1;
      default:
        return 1;
    }
  }, [modelingModel]);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    setIsHovered(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setIsHovered(false);
  }, [isMobile]);

  return (
    <BaseRecordCard
      createAt={createAt}
      onClick={onClick}
      onDownload={onDownload}
      onDelete={onDelete}
      onShowModel={onShowModel}
      isShowModel={isShowModel}
      canScale={false}
      canHighlight={false}
    >
      <div
        className="relative flex h-full w-full items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {" "}
        <div className="absolute bottom-0 left-0 rounded-md bg-black/10 px-2 py-1 text-xs backdrop-blur">
          {modelingModel}
        </div>
        <div className="absolute bottom-0 right-0 rounded-md bg-black/10 px-2 py-1 text-xs backdrop-blur">
          {modelingFormat}
        </div>
        {showModel && !didCatch ? (
          <ErrorBoundary>
            <Suspense
              fallback={
                <Loader2 className="size-8 animate-spin text-primary" />
              }
            >
              <Canvas
                ref={canvasRef}
                fallback={
                  <img
                    className="h-full w-full object-contain"
                    src={imageUrl}
                    alt="fallback"
                  />
                }
                camera={{ position: [5, 5, 5], fov: 20 }}
              >
                <ambientLight />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={lightIntensity}
                />
                <directionalLight
                  position={[-10, -10, 5]}
                  intensity={lightIntensity}
                />
                <ModelContainer
                  modelUrl={modelUrl}
                  fileType={modelingFormat}
                  textures={textures}
                />
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  enableRotate={false}
                  autoRotate={true}
                />
              </Canvas>
            </Suspense>
          </ErrorBoundary>
        ) : (
          <img
            className="h-full w-full object-contain"
            src={imageUrl}
            alt="fallback"
          />
        )}
      </div>
    </BaseRecordCard>
  );
}
