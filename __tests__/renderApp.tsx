import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import App from 'src/App.tsx';
import type { Character } from 'src/types';
import { ThemeProvider } from 'src/shared/context/provider.tsx';

export interface ResponseLike<T> {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<T>;
}

type RenderAppOptions = {
  mockFetch?: (url: string) => Promise<ResponseLike<{ results: Character[] }>>;
  localStorageTerm?: string;
};

export const renderApp = (options: RenderAppOptions = {}) => {
  const { mockFetch, localStorageTerm } = options;

  if (mockFetch) {
    global.fetch = vi.fn().mockImplementation(mockFetch);
  }

  if (localStorageTerm) {
    localStorage.setItem('searchTerm', localStorageTerm);
  }

  render(
    <ThemeProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  );

  return {
    input: screen.getByRole('textbox'),
    button: screen.getByRole('button', { name: /search/i }),
    getLoading: () => screen.queryByText(/loading/i),
  };
};

export const mockSuccessResponse = (
  results: Character[]
): ResponseLike<{ results: Character[] }> => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  json: async () => ({ results }),
});

export const mockErrorResponse = (
  status: number,
  statusText: string
): ResponseLike<{ results: Character[] }> => ({
  ok: false,
  status,
  statusText,
  json: async () => ({ results: [] }),
});
