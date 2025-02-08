"use client";

import { useIsMobile } from "@/hooks/global/use-mobile";
import { cn } from "@/lib/utils";

interface ActivatedBoxProps {
  children: React.ReactNode;
  className?: string;
  canScale?: boolean;
  canHighlight?: boolean;
  onClick: () => void;
}

export function ActivatedBox({
  children,
  className,
  onClick,
  canScale = false,
  canHighlight = true,
}: ActivatedBoxProps) {
  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    onClick();
  };

  return (
    <div
      className={cn(
        "relative min-h-[150px] min-w-[150px] flex-shrink-0 cursor-pointer rounded-lg border p-1 transition-all duration-100",
        canScale && "hover:scale-110",
        canHighlight && "hover:border-primary",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
