import AppLogo from "@/components/global/app-logo";
import { useIsHideBrand } from "@/hooks/global/use-is-hide-brand";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HomeHeader() {
  const t = useTranslations("home");
  const globalT = useTranslations("global");
  const isHidingBrand = useIsHideBrand();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const isHome = pathname === "/" || pathname.endsWith("/page");
  const isEnvironment = pathname.includes("/environment");

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-center gap-2">
        {!isHidingBrand && <AppLogo size="mini" height={32} width={32} />}
        <h1 className="text-2xl font-bold">{t("header.title")}</h1>
      </div>
      <div className="mb-4 flex justify-center gap-4">
        <Link
          href={`/${locale}`}
          className={cn(
            "rounded-md px-4 py-2 transition-colors",
            isHome ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          )}
        >
          {globalT("navigation.portrait")}
        </Link>
        <Link
          href={`/${locale}/environment`}
          className={cn(
            "rounded-md px-4 py-2 transition-colors",
            isEnvironment
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          {globalT("navigation.environment")}
        </Link>
      </div>
      <div className="mb-2 w-full text-center">
        <p className="mx-auto max-w-3xl text-sm text-muted-foreground">
          {t("description.project")}
        </p>
      </div>
    </div>
  );
}
