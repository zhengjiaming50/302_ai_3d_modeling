"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { environmentModelStore } from "@/stores/slices/environment_model_store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Environment3DViewer } from "@/components/environment-3d-viewer/environment-3d-viewer";

export function EnvironmentModelPreview() {
  const t = useTranslations("environment");
  const { environmentModelUrl } = useAtomValue(environmentModelStore);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("label.environmentModelPreview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md border p-2">
          {environmentModelUrl ? (
            <Environment3DViewer modelUrl={environmentModelUrl} />
          ) : (
            <div className="flex h-96 w-full flex-col items-center justify-center gap-y-2 text-muted-foreground">
              <Image
                src="/assets/images/3d-model.png"
                alt="3D Model"
                width={100}
                height={100}
              />
              <span>{t("label.noEnvironmentModelGenerated")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
