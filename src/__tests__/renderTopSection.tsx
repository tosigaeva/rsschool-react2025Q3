import { render, screen } from '@testing-library/react';
import { SearchPanelSection } from '#/pages/search/components/search-panel';
import { BrowserRouter } from 'react-router';
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

  render(
    <BrowserRouter>
      <SearchPanelSection onSearch={mockOnSearch} />
    </BrowserRouter>
  );

  return {
    input: screen.getByRole('textbox'),
    button: screen.getByRole('button', { name: /search/i }),
    mockOnSearch,
  };
};
