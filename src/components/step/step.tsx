import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface StepProps {
  currentStep: "1" | "2";
}

export function Step({ currentStep }: StepProps) {
  const t = useTranslations("home.step");

  return (
    <div className="mx-auto flex w-full flex-row justify-center gap-x-4">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <span className="text-sm text-white">1</span>
        </div>
        <span className="text-sm text-primary">{t("image_setting")}</span>
      </div>

      <hr
        className={cn(
          "my-5 h-full w-1/3 border-t-2 border-dashed",
          currentStep === "1" ? "border-border" : "border-primary"
        )}
      />

      <div className="flex flex-col items-center justify-center gap-y-1">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            currentStep === "2" ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "text-sm",
              currentStep === "2" ? "text-white" : "text-muted-foreground"
            )}
          >
            2
          </span>
        </div>
        <span
          className={cn(
            "text-sm",
            currentStep === "2" ? "text-primary" : "text-muted-foreground"
          )}
        >
          {t("model_generation")}
        </span>
      </div>
    </div>
  );
}
