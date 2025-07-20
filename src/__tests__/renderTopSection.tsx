import { render, screen } from '@testing-library/react';
import TopSection from '../components/TopSection';
import { vi } from 'vitest';

type RenderTopSectionOptions = {
  localStorageTerm?: string;
  mockOnSearch?: () => void;
};

export const renderTopSection = (options: RenderTopSectionOptions = {}) => {
  const { localStorageTerm, mockOnSearch = vi.fn() } = options;

  if (localStorageTerm) {
    localStorage.setItem('searchTerm', localStorageTerm);
  }

  render(<TopSection onSearch={mockOnSearch} />);

  return {
    input: screen.getByRole('textbox'),
    button: screen.getByRole('button', { name: /search/i }),
    mockOnSearch,
  };
};
