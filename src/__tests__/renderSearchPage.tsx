import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { SearchPage } from '#/pages/search/SearchPage';
import type { Character } from '#/types';
import * as useSearchTermStorage from '#/shared/hooks/useSearchTermStorage';

const mockUseCharactersQuery = vi.fn();
const mockUseInvalidateCharacters = vi.fn();

vi.mock('#/shared/api/useQueries.ts', () => ({
  useCharactersQuery: () => mockUseCharactersQuery(),
  useInvalidateCharacters: () => mockUseInvalidateCharacters(),
}));

vi.mock('#/shared/hooks/useSearchTermStorage.ts', () => ({
  default: vi.fn(),
}));

const mockSetSearchParams = vi.fn();
const mockUseSearchParams = vi.fn();
const mockUseOutlet = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => [mockUseSearchParams(), mockSetSearchParams],
    useOutlet: () => mockUseOutlet(),
  };
});

type RenderSearchPageOptions = {
  searchTerm?: string;
  results?: { results: Character[]; totalPages: number };
  isLoading?: boolean;
  hasBeenSearched?: boolean;
  error?: Error | null;
  currentPage?: number;
  totalPages?: number;
  searchParams?: URLSearchParams;
  outlet?: React.ReactElement | null;
  mockLoadData?: (term: string, page: number) => Promise<void>;
};

export const renderSearchPage = (options: RenderSearchPageOptions = {}) => {
  const {
    searchTerm = '',
    results = [],
    isLoading = true,
    hasBeenSearched = false,
    error = null,
    searchParams = new URLSearchParams(),
    outlet = null,
    mockLoadData = vi.fn().mockResolvedValue(undefined),
  } = options;

  vi.mocked(useSearchTermStorage.default).mockReturnValue([
    searchTerm,
    vi.fn(),
  ]);

  mockUseCharactersQuery.mockReturnValue({
    data: results,
    isLoading: isLoading,
    error,
    isFetched: hasBeenSearched,
  });
  mockUseInvalidateCharacters.mockReturnValue({
    data: results,
    isLoading: isLoading,
    error,
  });

  mockUseSearchParams.mockReturnValue(searchParams);

  mockUseOutlet.mockReturnValue(outlet);

  const { container } = render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );

  return {
    container,
    mockLoadData,
    mockSetSearchParams,
    getSearchPanel: () =>
      container.querySelector('input[placeholder="Search for a character..."]'),
    getSearchResults: () => screen.getByTestId('search-results'),
    getThrowErrorButton: () =>
      screen.getByRole('button', { name: /throw error/i }),
    getLoading: () => screen.queryByText(/loading/i),
    getError: () => (error ? screen.queryByText(error.message) : null),
    getMainContent: () => container.querySelector('.main-content'),
  };
};

export const mockCharacters: Character[] = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    url: 'http://localhost:8080/api/people/1',
  },
  {
    name: 'Leia Organa',
    birth_year: '19BBY',
    gender: 'female',
    url: 'http://localhost:8080/api/people/5',
  },
];
