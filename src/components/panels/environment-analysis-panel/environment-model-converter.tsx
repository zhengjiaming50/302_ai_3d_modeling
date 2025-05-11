"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { environmentModelStore } from "@/stores/slices/environment_model_store";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function EnvironmentModelConverter() {
  const t = useTranslations("environment");
  const { toast } = useToast();
  const [isConverting, setIsConverting] = useState(false);
  const { environmentModelUrl } = useAtomValue(environmentModelStore);

  const handleDownloadModel = async () => {
    try {
      if (!environmentModelUrl) return;

      setIsConverting(true);

      // 模拟转换过程
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模拟下载过程
      const link = document.createElement("a");
      link.href = environmentModelUrl;
      link.download = "environment-model.glb";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: t("toast.success"),
        description: t("toast.environmentModelDownloaded"),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: t("toast.error"),
        description: t("toast.environmentModelDownloadFailed"),
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownloadModel}
      disabled={!environmentModelUrl || isConverting}
    >
      {isConverting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      {t("button.downloadEnvironmentModel")}
    </Button>
  );
}
