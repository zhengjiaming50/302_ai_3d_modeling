"use client";

import { Label } from "@/components/ui/label";
import { GLOBAL } from "@/constants/values";
import { createScopedLogger } from "@/utils/logger";
import { useTranslations } from "next-intl";
import { store, languageAtom } from "@/stores";
import Image from "next/image";
import { memo } from "react";

const logger = createScopedLogger("SampleImagesList");

interface SampleImagesListProps {
  onSelected: (imageSrc: string, imagePrompt: string) => void;
}

export const SampleImagesList = memo(function SampleImagesList({
  onSelected,
}: SampleImagesListProps) {
  const t = useTranslations("home.panel.image_setting_panel.image_sample_list");

  const uiLanguage = store.get(languageAtom);

  const handleSelected = (imageSrc: string, imagePrompt: string) => {
    onSelected(imageSrc, imagePrompt);

    logger.info("Image selected:", imageSrc, imagePrompt);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium text-muted-foreground">{t("label")}</Label>
      <div className="relative">
        <div className="flex w-full flex-row items-center justify-start gap-3 overflow-x-auto rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
          {GLOBAL.IMAGE_SAMPLE_LIST.IMAGE_LIST.map((item) => (
            <div
              className="group relative min-h-[140px] min-w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border/30 bg-background/80 shadow-sm transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:shadow-md"
              key={item.name}
              onClick={() =>
                handleSelected(
                  item.imageSrc,
                  item[`prompt_${uiLanguage}` as keyof typeof item]
                )
              }
            >
              <Image
                src={item.imageSrc}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-110"
                sizes="140px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          ))}
        </div>
        {/* 滚动提示渐变 */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
});
