"use client";

import { useState } from "react";
import HomeHeader from "@/components/home/header";
import { ImageSettingPanel } from "@/components/panels/image-setting-panel/image-setting-panel";
import { ModelGenerationPanel } from "@/components/panels/model-generation-panel/model-generation-panel";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { useTranslations } from "next-intl";
import { Ban, ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useWindowSize } from "@/hooks/global/use-window-size";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { imageViewerStore } from "@/stores/slices/image_viewer_store";
import { Step } from "@/components/step/step";

export default function Home() {
  const t = useTranslations("home");
  const globalT = useTranslations("global");
  const isMobile = useIsMobile();
  const isSupportWindowSize = useWindowSize();

  const { uploadedImageUrl, generatedImageUrl } =
    useAtomValue(imageViewerStore);

  const [step, setStep] = useState<"1" | "2">("1");
  const [currentImageTab, setCurrentImageTab] = useState<
    "imageSetting" | "imageGeneration" | "cameraCapture"
  >("imageSetting");

  const disableButton =
    (step === "1" && currentImageTab === "imageSetting" && !uploadedImageUrl) ||
    (step === "1" &&
      currentImageTab === "imageGeneration" &&
      !generatedImageUrl);

  if (isSupportWindowSize) {
    return (
      <div className="m-auto flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground card-cyberpunk cyberpunk-pulse p-6 rounded-lg">
          <Ban className="h-8 w-8 text-cyber-cyan animate-flicker" />
          <span className="text-sm cyberpunk-text-glow">{t("label.unsupportedWindowSize")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative mx-auto mt-10 flex min-h-[calc(100vh-6rem)] max-w-[1280px] flex-col items-center gap-4 rounded-lg card-cyberpunk cyberpunk-bg p-4 shadow-cyber-lg cyberpunk-scan">
      <HomeHeader />
      <div className="mb-4 w-full text-center">
        <h2 className="mb-2 text-xl font-bold cyberpunk-text-glow animate-float">
          {globalT("navigation.portrait")}
        </h2>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          {t("description.portrait")}
        </p>
      </div>
      {!isMobile ? (
        <div className="-mx-4 flex h-full w-full flex-row divide-x divide-border">
          <div className="h-full w-1/2 pr-4">
            <div className="card-cyberpunk rounded-lg p-2 h-full">
              <ImageSettingPanel />
            </div>
          </div>
          <div className="h-full w-1/2 pl-4">
            <div className="card-cyberpunk rounded-lg p-2 h-full">
              <ModelGenerationPanel />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-y-6">
          <Step currentStep={step} />

          {step === "1" ? (
            <div className="card-cyberpunk rounded-lg p-4">
              <ImageSettingPanel onTabChange={setCurrentImageTab} />
            </div>
          ) : (
            <div className="card-cyberpunk rounded-lg p-4">
              <ModelGenerationPanel />
            </div>
          )}

          <Button
            className={cn(
              step === "1" ? "self-end" : "self-start",
              "btn-cyberpunk hover:shadow-cyber-xl transition-all duration-300"
            )}
            variant={step === "1" ? "default" : "outline"}
            onClick={() => setStep(step === "1" ? "2" : "1")}
            disabled={disableButton}
          >
            {step === "1" ? (
              <>
                {t("label.next")}
                <ArrowRightToLine className="size-4 ml-2 animate-pulse" />
              </>
            ) : (
              <>
                <ArrowLeftToLine className="size-4 mr-2 animate-pulse" />
                {t("label.previous")}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
