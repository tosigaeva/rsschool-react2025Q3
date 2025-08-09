import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { DetailsPage } from './DetailsPage';
import type { CharacterDetails } from '#/types';
import * as useClient from '#/shared/api/useClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();
const mockUseCharacterDetailsQuery = vi.fn();

vi.mock('#/shared/api/useQueries.ts', () => ({
  useCharacterDetailsQuery: () => mockUseCharacterDetailsQuery(),
}));
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  };
});

describe('DetailsPage', () => {
  const mockCharacter: CharacterDetails = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    url: 'http://localhost:8080/api/people/1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1' });
  });
  const queryClient = new QueryClient();

  describe('Rendering Tests', () => {
    it('displays loading state initially', () => {
      mockUseCharacterDetailsQuery.mockReturnValue({
        data: mockCharacter,
        isLoading: true,
        error: null,
      });
      render(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <DetailsPage />
          </QueryClientProvider>
        </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays character details when data is loaded', async () => {
      mockUseCharacterDetailsQuery.mockReturnValue({
        data: mockCharacter,
        isLoading: false,
        error: null,
      });
      render(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <DetailsPage />
          </QueryClientProvider>
        </MemoryRouter>
      );

      expect(screen.getByText('name:')).toBeInTheDocument();
      expect(screen.getByText('name:')).toBeInTheDocument();
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('birth_year:')).toBeInTheDocument();
      expect(screen.getByText('19BBY')).toBeInTheDocument();
      expect(screen.getByText('gender:')).toBeInTheDocument();
      expect(screen.getByText('male')).toBeInTheDocument();
    });

    it('displays error message when there is an error', () => {
      mockUseCharacterDetailsQuery.mockReturnValue({
        data: mockCharacter,
        isLoading: false,
        error: new Error('Failed to fetch character'),
      });

      render(<DetailsPage />);

      expect(screen.getByText('Failed to fetch character')).toBeInTheDocument();
    });

    it('displays generic error message for unknown error types', () => {
      const mockUseFetchItem = vi.fn().mockReturnValue({
        loadData: vi.fn().mockResolvedValue({}),
        isLoading: false,
        character: null,
        error: 'Unknown error',
      });

      vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      expect(screen.getByText('Unknown error occurred')).toBeInTheDocument();
    });
  });

  describe('Navigation Tests', () => {
    it('navigates back to home page when close button is clicked', async () => {
      const mockLoadData = vi
        .fn()
        .mockResolvedValue({ character: mockCharacter });
      const mockUseFetchItem = vi.fn().mockReturnValue({
        loadData: mockLoadData,
        isLoading: false,
        character: mockCharacter,
        error: null,
      });

      vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

      Object.defineProperty(window, 'location', {
        value: {
          search: '?search=luke&page=1',
        },
        writable: true,
      });

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: '×' });
        expect(closeButton).toBeInTheDocument();
      });

      const closeButton = screen.getByRole('button', { name: '×' });
      closeButton.click();

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/',
        search: '?search=luke&page=1',
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty character data gracefully', async () => {
      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('name:')).not.toBeInTheDocument();
      });
    });

    it('handles character with empty values', async () => {
      const emptyCharacter: CharacterDetails = {
        name: '',
        birth_year: '',
        gender: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        url: 'http://localhost:8080/api/people/1',
      };

      const mockLoadData = vi
        .fn()
        .mockResolvedValue({ character: emptyCharacter });
      const mockUseFetchItem = vi.fn().mockReturnValue({
        loadData: mockLoadData,
        isLoading: false,
        character: emptyCharacter,
        error: null,
      });

      vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('name:')).toBeInTheDocument();
        expect(screen.getByText('birth_year:')).toBeInTheDocument();
        expect(screen.getByText('gender:')).toBeInTheDocument();
        const valueSpans = document.querySelectorAll('p > span:nth-of-type(2)');
        expect(valueSpans).toHaveLength(9);
        const emptySpans = Array.from(valueSpans).filter(
          (span) => span.textContent === ''
        );
        expect(emptySpans).toHaveLength(8);
        const urlSpan = Array.from(valueSpans).find(
          (span) => span.textContent === 'http://localhost:8080/api/people/1'
        );
        expect(urlSpan).toBeInTheDocument();
      });
    });
  });
});
