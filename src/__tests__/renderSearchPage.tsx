import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { SearchPage } from '#/pages/search/SearchPage';
import type { Character } from '#/types';
import * as useClient from '#/shared/api/useClient';
import * as useSearchTermStorage from '#/shared/hooks/useSearchTermStorage';

// Mock the useFetchAll hook
vi.mock('#/shared/api/useClient.ts', () => ({
  useFetchAll: vi.fn(),
}));

// Mock the useSearchTermStorage hook
vi.mock('#/shared/hooks/useSearchTermStorage.ts', () => ({
  default: vi.fn(),
}));

// Mock react-router hooks
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
  results?: Character[];
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
    isLoading = false,
    hasBeenSearched = false,
    error = null,
    totalPages = 0,
    searchParams = new URLSearchParams(),
    outlet = null,
    mockLoadData = vi.fn().mockResolvedValue(undefined),
  } = options;

  // Mock useSearchTermStorage
  vi.mocked(useSearchTermStorage.default).mockReturnValue([
    searchTerm,
    vi.fn(),
  ]);

  // Mock useFetchAll
  const mockUseFetchAll = vi.fn().mockReturnValue({
    loadData: mockLoadData,
    isLoading,
    results,
    totalPages,
    hasBeenSearched,
    error,
  });

  vi.mocked(useClient.useFetchAll).mockImplementation(mockUseFetchAll);

  // Mock useSearchParams
  mockUseSearchParams.mockReturnValue(searchParams);

  // Mock useOutlet
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
    getTitle: () => screen.getByText('Star Wars Character Finder'),
    getSearchPanel: () =>
      container.querySelector('input[placeholder="Search for a character..."]'),
    getSearchResults: () => container.querySelector('.bottom-section'),
    getThrowErrorButton: () =>
      screen.getByRole('button', { name: /throw error/i }),
    getAboutLink: () => screen.getByRole('link', { name: /about/i }),
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
