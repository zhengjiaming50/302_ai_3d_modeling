"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { Loader2, Package, Ban, Sun, CircleX } from "lucide-react";
import { ModelContainer } from "./model-container";
import {
  modelViewerStore,
  resetModelViewerStore,
} from "@/stores/slices/model_viewer_store";
import { useTranslations } from "next-intl";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { cn } from "@/lib/utils";
import JSZip from "jszip";
import { ActionGroup } from "../action-group/action-group";
import { toast } from "sonner";
import { useMonitorMessage } from "@/hooks/global/use-monitor-message";
import saveAs from "file-saver";
import { Slider } from "@/components/ui/slider";
import { useErrorBoundary } from "use-error-boundary";

export function ThreeDViewer() {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_preview"
  );

  const controlsRef = useRef<any>(null);

  const { handleDownload: _handleDownload } = useMonitorMessage();
  const { ErrorBoundary, didCatch } = useErrorBoundary();

  const currentModel = useAtomValue(modelViewerStore);
  const resetModelViewer = useSetAtom(resetModelViewerStore);
  const { fileType, modelUrl, textures, modelingModel } = currentModel;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(1.0);

  const handleDownload = useCallback(() => {
    const fileName = Date.now();
    if (fileType === "glb") {
      toast.promise(_handleDownload(modelUrl, `${fileName}.${fileType}`), {
        loading: t("download_status.loading"),
        success: t("download_status.success"),
        error: t("download_status.error"),
      });
    } else {
      const downloadZip = async () => {
        const zip = new JSZip();
        const folder = zip.folder(`${fileName}`);

        const modelResponse = await fetch(modelUrl);
        const modelBlob = await modelResponse.blob();
        folder?.file(`${fileName}.${fileType}`, modelBlob);

        await Promise.all(
          textures.map(async (url, index) => {
            const response = await fetch(url);
            const blob = await response.blob();
            folder?.file(`${fileName}-${index}.${url.split(".").pop()}`, blob);
          })
        );

        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `${fileName}.zip`);
        });
      };

      toast.promise(downloadZip(), {
        loading: t("download_status.loading"),
        success: t("download_status.success"),
        error: t("download_status.error"),
      });
    }
  }, [_handleDownload, fileType, modelUrl, t, textures]);

  const handleDelete = useCallback(() => {
    setIsFullscreen(false);
    resetModelViewer();
  }, [resetModelViewer]);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [modelUrl]);

  useEffect(() => {
    switch (modelingModel) {
      case "Trellis":
        setLightIntensity(10);
        break;
      case "Tripo3D":
        setLightIntensity(7);
        break;
      case "Hyper3D":
        setLightIntensity(1);
        break;
      case "StableFast3D":
        setLightIntensity(1);
        break;
      case "StablePoint3D":
        setLightIntensity(1);
        break;
      default:
        setLightIntensity(1);
    }
  }, [modelingModel]);

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center rounded-lg border border-border bg-muted",
        modelUrl === "" ? "" : "border-primary",
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none"
          : "h-[400px]"
      )}
    >
      {modelUrl !== "" && (
        <>
          <div className="absolute bottom-2 left-2 rounded-md bg-black/10 px-2 py-1 text-xs backdrop-blur">
            {modelingModel}
          </div>
          <div className="absolute bottom-2 right-2 rounded-md bg-black/10 px-2 py-1 text-xs backdrop-blur">
            {fileType}
          </div>
        </>
      )}

      {modelUrl === "" ? (
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
          <Package className="size-8" />
          <span>{t("placeholder")}</span>
        </div>
      ) : (
        <>
          {didCatch ? (
            <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
              <CircleX className="size-8" />
              <span className="text-center">{t("error")}</span>
            </div>
          ) : (
            <ErrorBoundary>
              <Suspense
                fallback={
                  <Loader2 className="size-8 animate-spin text-primary" />
                }
              >
                <Canvas
                  fallback={
                    <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
                      <Ban className="size-8" />
                      <span>{t("unsupported_webgl")}</span>
                    </div>
                  }
                  camera={{ position: [5, 5, 5], fov: 20 }}
                  className={cn(
                    "cursor-grab",
                    isFullscreen && "h-screen w-screen"
                  )}
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
                    fileType={fileType}
                    textures={textures}
                  />
                  <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={true}
                    maxDistance={20.0}
                    minDistance={1.0}
                  />
                </Canvas>
              </Suspense>

              <div className="absolute left-4 top-4 flex w-full flex-row items-center gap-2">
                <Sun className="size-4 text-muted-foreground" />
                <Slider
                  className="w-1/3"
                  min={1}
                  max={20}
                  step={0.1}
                  value={[lightIntensity]}
                  onValueChange={(value) => {
                    setLightIntensity(value[0]);
                  }}
                />
              </div>
              <ActionGroup
                className="hidden group-hover:block"
                onDownload={handleDownload}
                onDelete={handleDelete}
                onFullscreen={handleFullscreen}
                isFullscreen={isFullscreen}
              />
            </ErrorBoundary>
          )}
        </>
      )}
    </div>
  );
}
