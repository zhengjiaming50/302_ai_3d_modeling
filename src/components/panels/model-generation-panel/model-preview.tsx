"use client";

import { ThreeDViewer } from "@/components/three-d/three-d-viewer";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export function ModelPreview() {
  const t = useTranslations(
    "home.panel.modeling_generation_panel.modeling_preview"
  );

  return (
    <div className="flex flex-col gap-2">
      <Label>{t("label")}</Label>
      <ThreeDViewer />
    </div>
  );
}
