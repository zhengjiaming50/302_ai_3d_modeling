"use client";

import { ActivatedBox } from "@/components/activated-box/activated-box";
import { format } from "date-fns";
import { Check, Eye, Download, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { cn } from "@/lib/utils";

interface BaseRecordCardProps {
  createAt: number;
  onClick: () => void;
  onDownload: () => void;
  onDelete: () => void;
  onShowModel?: () => void;
  isShowModel?: boolean;
  isImage?: boolean;
  canScale?: boolean;
  canHighlight?: boolean;
  children: React.ReactNode;
}

export function BaseRecordCard({
  createAt,
  onClick,
  onDownload,
  onDelete,
  onShowModel,
  isShowModel,
  isImage = false,
  children,
  canScale = false,
  canHighlight = true,
}: BaseRecordCardProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex w-full flex-col gap-y-2">
      <ActivatedBox
        className={cn(
          "h-[200px] w-[200px] self-center justify-self-center",
          isShowModel && "border-primary"
        )}
        onClick={onClick}
        canScale={canScale}
        canHighlight={canHighlight}
      >
        {children}
      </ActivatedBox>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col text-sm text-muted-foreground">
          <span>{format(createAt, "yyyy-MM-dd")}</span>
          <span>{format(createAt, "HH:mm:ss")}</span>
        </div>
        <div className="flex flex-row">
          {isMobile && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={onShowModel}
                className={cn(isImage && "hidden")}
              >
                <Eye
                  className={cn(
                    "text-muted-foreground",
                    isShowModel && "text-muted-foreground/80"
                  )}
                />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClick}>
                <Check className="text-green-600" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" onClick={onDownload}>
            <Download className="text-primary" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash className="text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}
