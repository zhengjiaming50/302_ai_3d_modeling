import { cn } from "@/lib/utils";
import { Download, X, Fullscreen, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionGroupProps {
  onDownload: () => void;
  onDelete: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
  className?: string;
}

export function ActionGroup({
  onDownload,
  onDelete,
  onFullscreen,
  isFullscreen,
  className,
}: ActionGroupProps) {
  return (
    <div
      className={cn(
        "absolute right-2 top-2 flex items-center gap-2",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onFullscreen}
        className="size-8 text-muted-foreground hover:text-muted-foreground/80"
      >
        {isFullscreen ? <Minimize2 /> : <Fullscreen />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDownload}
        className="size-8 text-primary hover:text-primary/80"
      >
        <Download />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="size-8 text-red-600 hover:text-red-600/80"
      >
        <X />
      </Button>
    </div>
  );
}
