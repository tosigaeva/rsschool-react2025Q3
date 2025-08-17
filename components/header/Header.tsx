'use client';

import { ThemeToggle } from '#/components/theme/toggle';
import { locales } from '#/i18n/request';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';

const { Link } = createNavigation();

export function Header() {
  const t = useTranslations();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    window.location.href = `/${newLocale}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`;
  };

  return (
    <header className="border-b-divider mb-12 flex justify-between border-b px-5">
      <h1 className="mb-3.5 text-3xl">Star Wars Character Finder</h1>
      <div className="flex items-end gap-9">
        <nav className="flex items-end gap-2">
          <Link href="/" className="nav-link">
            {t('navigation.search')}
          </Link>
          <Link href="/about" className="nav-link">
            {t('navigation.about')}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`rounded px-2 py-1 ${
                  locale === l ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {t(`language.${l}`)}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
