import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

export interface ResponseLike<T> {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<T>;
}

type RenderAppOptions = {
  mockFetch?: (url: string) => Promise<ResponseLike<{ results: Person[] }>>;
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
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  return {
    input: screen.getByRole('textbox'),
    button: screen.getByRole('button', { name: /search/i }),
    getLoading: () => screen.queryByText(/loading/i),
  };
};

export const mockSuccessResponse = (
  results: Person[]
): ResponseLike<{ results: Person[] }> => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  json: async () => ({ results }),
});

export const mockErrorResponse = (
  status: number,
  statusText: string
): ResponseLike<{ results: Person[] }> => ({
  ok: false,
  status,
  statusText,
  json: async () => ({ results: [] }),
});
