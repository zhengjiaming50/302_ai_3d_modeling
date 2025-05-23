"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import HomeHeader from "@/components/home/header";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { useWindowSize } from "@/hooks/global/use-window-size";
import { Ban } from "lucide-react";
import { ComparisonPanel } from "@/components/panels/comparison-panel/comparison-panel";

export default function ComparisonPage() {
  const t = useTranslations("comparison");
  const globalT = useTranslations("global");
  const isMobile = useIsMobile();
  const isSupportWindowSize = useWindowSize();

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
      <div className="mb-4 w-full text-center">
        <h2 className="mb-2 text-xl font-bold">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <div className="w-full">
        <ComparisonPanel />
      </div>
    </div>
  );
} 