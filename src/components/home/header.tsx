"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function HomeHeader() {
  const t = useTranslations("header");
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/",
      label: t("link.home"),
      active: pathname === "/",
    },
    {
      href: "/environment-analysis",
      label: t("link.environmentAnalysis"),
      active: pathname === "/environment-analysis",
    },
  ];

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-x-2">
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={40}
          height={40}
        />
        <div className="select-none text-xl font-bold">{t("title")}</div>
      </div>

      <nav className="flex space-x-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              link.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
