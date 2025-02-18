"use client";

import { LoaderRenderer } from "@/components/common/loader-renderer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModelConverter } from "@/hooks/converter/use-model-converter";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function ModelConverter() {
  const t = useTranslations("home.model_converter");

  const {
    isOpen,
    disabled,
    typeList,
    converting,
    handleOpenChange,
    handleConvert,
  } = useModelConverter();

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger className={cn(disabled && "cursor-default")}>
        <div
          onClick={() => handleOpenChange(true)}
          className={cn(
            "inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            disabled &&
              "pointer-events-none cursor-default opacity-50 hover:bg-background"
          )}
        >
          <LoaderRenderer
            status={converting ? "converting" : "idle"}
            statuses={{
              converting: {
                text: t("converting"),
                icon: <Loader2 className="h-4 w-4 animate-spin" />,
              },
              idle: {
                text: t("model_converter"),
              },
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex flex-col">
          {typeList.map((type) => (
            <div
              className="cursor-pointer px-2 py-1 text-sm font-medium hover:bg-muted"
              key={type}
              onClick={() => handleConvert(type)}
            >
              {`${t("label")}${type.toUpperCase()}`}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
