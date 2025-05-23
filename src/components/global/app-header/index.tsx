"use client";
import { cn } from "@/lib/utils";
import { isOutsideDeployMode } from "@/utils/302";
import { isAuthPath } from "@/utils/path";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { ToolInfo } from "./tool-info";
import ChatToggler from "./chat-toggler";
import { GithubHyperlink } from "./github-hyperlink";

type HeaderProps = {
  className?: string;
};

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ className }, ref) => {
  const pathname = usePathname();
  return (
    <header
      className={cn(
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 cyberpunk-scan",
        className
      )}
    >
      <div
        ref={ref}
        className={cn(
          "fixed right-0 top-0 z-50 flex items-center justify-end gap-2 p-2 cyberpunk-glow rounded-bl-lg",
          className
        )}
      >
        <GithubHyperlink />
        {!isAuthPath(pathname) && !isOutsideDeployMode() && <ToolInfo />}
        <ChatToggler />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
});

Header.displayName = "AppHeader";

export default Header;
