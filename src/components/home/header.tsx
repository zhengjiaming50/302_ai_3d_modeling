import AppLogo from "@/components/global/app-logo";
import { useIsHideBrand } from "@/hooks/global/use-is-hide-brand";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export default function HomeHeader() {
  const t = useTranslations("home");
  const isHidingBrand = useIsHideBrand();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        {!isHidingBrand && <AppLogo size="mini" height={32} width={32} />}
        <h1 className="text-2xl font-bold">{t("header.title")}</h1>
      </div>

      <nav className="flex space-x-4">
        <Link
          href={`/${locale}`}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === `/${locale}`
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          {t("header.nav.home")}
        </Link>
        <Link
          href={`/${locale}/environment`}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname.includes("/environment")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          {t("header.nav.environment")}
        </Link>
      </nav>
    </div>
  );
}
