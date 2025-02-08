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
    <div className="flex flex-col gap-2">
      <Label>{t("label")}</Label>
      <div className="flex w-full flex-row items-center justify-start gap-4 overflow-x-auto rounded-lg border border-border p-4">
        {GLOBAL.IMAGE_SAMPLE_LIST.IMAGE_LIST.map((item) => (
          <div
            className="relative min-h-[150px] min-w-[150px] flex-shrink-0 cursor-pointer rounded-lg border border-transparent transition-all duration-100 hover:scale-110 hover:border-primary"
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
              className="object-contain"
              sizes="150px"
            />
          </div>
        ))}
      </div>
    </div>
  );
});
