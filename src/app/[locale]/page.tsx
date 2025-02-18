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
