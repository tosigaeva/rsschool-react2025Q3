import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { DetailsPage } from './DetailsPage';
import type { CharacterDetails } from '#/types';
import * as useClient from '#/shared/api/useClient';

// Mock the useFetchItem hook
vi.mock('#/shared/api/useClient.ts', () => ({
  useFetchItem: vi.fn(),
}));

// Mock react-router hooks
const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

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

  describe('Rendering Tests', () => {
    it('displays loading state initially', () => {
      const mockUseFetchItem = vi.fn().mockReturnValue({
        loadData: vi.fn().mockResolvedValue({}),
        isLoading: true,
        character: null,
        error: null,
      });

      vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays character details when data is loaded', async () => {
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

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('name:')).toBeInTheDocument();
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('birth_year:')).toBeInTheDocument();
        expect(screen.getByText('19BBY')).toBeInTheDocument();
        expect(screen.getByText('gender:')).toBeInTheDocument();
        expect(screen.getByText('male')).toBeInTheDocument();
      });
    });

    it('displays error message when there is an error', () => {
      const mockUseFetchItem = vi.fn().mockReturnValue({
        loadData: vi.fn().mockResolvedValue({}),
        isLoading: false,
        character: null,
        error: new Error('Failed to fetch character'),
      });

      vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

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

  describe('Data Loading Tests', () => {
    it('calls loadData with correct id when component mounts', async () => {
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

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockLoadData).toHaveBeenCalledWith('1');
      });
    });

    it('does not call loadData when id is not provided', () => {
      mockUseParams.mockReturnValue({ id: undefined });

      const mockLoadData = vi.fn().mockResolvedValue({});
      const mockUseFetchItem = vi.fn().mockReturnValue({
        loadData: mockLoadData,
        isLoading: false,
        character: null,
        error: null,
      });

      vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      expect(mockLoadData).not.toHaveBeenCalled();
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

      // Mock window.location.search
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
      const mockLoadData = vi.fn().mockResolvedValue({ character: null });
      const mockUseFetchItem = vi.fn().mockReturnValue({
        loadData: mockLoadData,
        isLoading: false,
        character: null,
        error: null,
      });

      vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

      render(
        <MemoryRouter>
          <DetailsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        // CardDetails should not render when character is null
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
        // Values should be empty but labels should still be present
        const valueSpans = document.querySelectorAll(
          '.character-details__value'
        );
        expect(valueSpans).toHaveLength(9); // All character properties including url

        // Check that most values are empty, but url has a value
        const emptySpans = Array.from(valueSpans).filter(
          (span) => span.textContent === ''
        );
        expect(emptySpans).toHaveLength(8); // 8 empty values

        // Check that url has the expected value
        const urlSpan = Array.from(valueSpans).find(
          (span) => span.textContent === 'http://localhost:8080/api/people/1'
        );
        expect(urlSpan).toBeInTheDocument();
      });
    });
  });
});
