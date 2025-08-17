import { useTheme } from '#/components/theme/context';
import { useTranslations } from 'next-intl';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();

  return (
    <button
      onClick={toggleTheme}
      className="mb-2 h-10 w-10"
      aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};
