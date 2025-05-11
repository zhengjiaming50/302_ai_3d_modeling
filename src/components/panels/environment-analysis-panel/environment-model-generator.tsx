"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { imageViewerStore } from "@/stores/slices/image_viewer_store";
import { environmentModelStore } from "@/stores/slices/environment_model_store";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EnvironmentModelConverter } from "./environment-model-converter";

export function EnvironmentModelGenerator() {
  const t = useTranslations("environment");
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const { uploadedImageUrl, generatedImageUrl } =
    useAtomValue(imageViewerStore);
  const setEnvironmentModelStore = useSetAtom(environmentModelStore);

  const handleGenerateEnvironmentModel = async () => {
    try {
      setIsGenerating(true);

      // 模拟API调用，实际项目中应替换为真实API
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 模拟获取环境模型URL
      const mockModelUrl = "/assets/models/environment-sample.glb";

      setEnvironmentModelStore({
        environmentModelUrl: mockModelUrl,
      });

      toast({
        title: t("toast.success"),
        description: t("toast.environmentModelGenerated"),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: t("toast.error"),
        description: t("toast.environmentModelGenerationFailed"),
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sourceImage = uploadedImageUrl || generatedImageUrl;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("label.generateEnvironmentModel")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-wrap items-center gap-4">
            <Button
              disabled={!sourceImage || isGenerating}
              onClick={handleGenerateEnvironmentModel}
            >
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("button.generateEnvironmentModel")}
            </Button>
            <EnvironmentModelConverter />
          </div>
          <div className="text-sm text-muted-foreground">
            {t("label.environmentModelDescription")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
