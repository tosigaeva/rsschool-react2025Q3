import { render, screen } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './provider.tsx';
import { useTheme } from './context.ts';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization Tests', () => {
    it('should initialize with light context when no stored context and no dark mode preference', () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-context')).toHaveTextContent('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('Theme Toggle Tests', () => {
    it('should toggle from light to dark context when toggleTheme is called', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-context')).toHaveTextContent('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      const toggleButton = screen.getByTestId('toggle-button');
      await user.click(toggleButton);

      expect(screen.getByTestId('current-context')).toHaveTextContent('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('Persistence Tests', () => {
    it('should save context preference to localStorage when context is toggled', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      await user.click(toggleButton);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');

      await user.click(toggleButton);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    });
  });
});
