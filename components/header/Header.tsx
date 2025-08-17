"use client";

import { ThemeToggle } from "#/components/theme/toggle";
import { useNavigation } from "#/hooks/useNavigation";
import { routing } from "#/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { useSearchParams } from "next/navigation";

const { Link, usePathname } = createNavigation();

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { refreshLocale } = useNavigation();
  const switchLocale = (locale: string) => {
    const params = new URLSearchParams(searchParams ?? []);
    params.set("locale", locale);
    refreshLocale(`/${locale}${pathname}?${params.toString()}`);
  };

  return (
    <header className="border-b-divider mb-12 flex justify-between border-b px-5">
      <h1 className="mb-3.5 text-3xl">{t("search.title")}</h1>
      <div className="flex items-end gap-9">
        <nav className="flex items-end gap-2">
          <Link href="/" className="nav-link">
            {t("navigation.search")}
          </Link>
          <Link href="/about" className="nav-link">
            {t("navigation.about")}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`w-10 rounded px-2 py-1 text-black ${
                  locale === l
                    ? "bg-primary-500 hover:bg-primary-400 hover:border-primary-400"
                    : "bg-primary-100"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
