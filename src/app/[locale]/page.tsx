"use client";

import { useState } from "react";
import HomeHeader from "@/components/home/header";
import { ImageSettingPanel } from "@/components/panels/image-setting-panel/image-setting-panel";
import { ModelGenerationPanel } from "@/components/panels/model-generation-panel/model-generation-panel";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { useTranslations } from "next-intl";
import {
  Ban,
  ArrowLeftToLine,
  ArrowRightToLine,
  Package,
  SquareCode,
  Layers3,
} from "lucide-react";
import { useWindowSize } from "@/hooks/global/use-window-size";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { imageViewerStore } from "@/stores/slices/image_viewer_store";
import { Step } from "@/components/step/step";

export default function Home() {
  const t = useTranslations("home");
  const isMobile = useIsMobile();
  const isSupportWindowSize = useWindowSize();

  const { uploadedImageUrl, generatedImageUrl } =
    useAtomValue(imageViewerStore);

  const [step, setStep] = useState<"1" | "2">("1");
  const [currentImageTab, setCurrentImageTab] = useState<
    "imageSetting" | "imageGeneration"
  >("imageSetting");

  const disableButton =
    (step === "1" && currentImageTab === "imageSetting" && !uploadedImageUrl) ||
    (step === "1" &&
      currentImageTab === "imageGeneration" &&
      !generatedImageUrl);

  if (isSupportWindowSize) {
    return (
      <div className="m-auto flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Ban className="h-4 w-4" />
          <span className="text-sm">{t("label.unsupportedWindowSize")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative mx-auto mt-10 flex min-h-[calc(100vh-6rem)] max-w-[1280px] flex-col items-center gap-4 rounded-lg border bg-background p-4 shadow-sm">
      <HomeHeader />

      {/* 系统描述区域 */}
      <div className="mb-6 w-full rounded-lg border bg-muted/50 p-4 text-sm">
        <div className="mb-2 flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">AIGC 3D建模系统</h2>
        </div>
        <p className="mb-3">
          本项目以AIGC技术为主要工具，建立一个网站，以文字或图像为索引，根据用户的目标需求实时生成所需的特定视角下的人像、物件、场景等图像，在此基础上将其三维化，形成多角度可旋转的3D图形。
        </p>
        <div className="mb-3 ml-4">
          <p className="mb-1">
            <span className="font-medium">1.</span>{" "}
            根据文字和图像线索进行3D建模，以补全人像信息。
          </p>
          <p className="mb-1">
            <span className="font-medium">2.</span>{" "}
            根据文字和图像线索对周边环境进行分析并建模，模拟还原现场环境。
          </p>
          <p className="mb-1">
            <span className="font-medium">3.</span>{" "}
            将生成的人像、场景等模型数据进行保存。
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-dashed bg-background/80 p-3">
          <div className="mb-2 font-medium text-primary">
            支持两种建模技术路线：
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <Layers3 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">AI建模技术</div>
                <div className="text-xs">
                  基于人工智能生成模型，适用于大多数普通场景和物体，生成速度快。
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <SquareCode className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">计算机视觉技术</div>
                <div className="text-xs">
                  基于OpenCV的点云重建技术，通过深度估计和特征检测，适合复杂结构和人像建模。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isMobile ? (
        <div className="-mx-4 flex h-full w-full flex-row divide-x">
          <div className="h-full w-1/2 pr-4">
            <ImageSettingPanel />
          </div>
          <div className="h-full w-1/2 pl-4">
            <ModelGenerationPanel />
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-y-6">
          <Step currentStep={step} />

          {step === "1" ? (
            <ImageSettingPanel onTabChange={setCurrentImageTab} />
          ) : (
            <ModelGenerationPanel />
          )}

          <Button
            className={cn(step === "1" ? "self-end" : "self-start")}
            variant={step === "1" ? "default" : "outline"}
            onClick={() => setStep(step === "1" ? "2" : "1")}
            disabled={disableButton}
          >
            {step === "1" ? (
              <>
                {t("label.next")}
                <ArrowRightToLine className="size-4" />
              </>
            ) : (
              <>
                <ArrowLeftToLine className="size-4" />
                {t("label.previous")}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
