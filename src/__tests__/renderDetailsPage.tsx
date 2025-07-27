import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { DetailsPage } from '#/pages/details-page/DetailsPage';
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

type RenderDetailsPageOptions = {
  id?: string;
  character?: CharacterDetails | null;
  isLoading?: boolean;
  error?: Error | null | unknown;
  mockLoadData?: () => Promise<{ character?: CharacterDetails }>;
};

export const renderDetailsPage = (options: RenderDetailsPageOptions = {}) => {
  const {
    id = '1',
    character = null,
    isLoading = false,
    error = null,
    mockLoadData = vi.fn().mockResolvedValue({}),
  } = options;

  mockUseParams.mockReturnValue({ id });

  const mockUseFetchItem = vi.fn().mockReturnValue({
    loadData: mockLoadData,
    isLoading,
    character,
    error,
  });

  vi.mocked(useClient.useFetchItem).mockImplementation(mockUseFetchItem);

  const { container } = render(
    <MemoryRouter>
      <DetailsPage />
    </MemoryRouter>
  );

  return {
    container,
    mockNavigate,
    mockLoadData,
    getLoading: () => screen.queryByText(/loading/i),
    getError: () => screen.queryByText(/error/i),
    getCharacterDetails: () => container.querySelector('.character-details'),
    getCloseButton: () => screen.queryByRole('button', { name: '×' }),
  };
};

export const mockCharacterDetails: CharacterDetails = {
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
