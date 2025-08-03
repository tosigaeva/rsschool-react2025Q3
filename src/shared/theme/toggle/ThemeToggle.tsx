import { useTheme } from '#/shared/theme/context.ts';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="mb-2 h-10 w-10">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};
