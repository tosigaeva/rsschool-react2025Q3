import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { Character } from '#/types';
import { SearchResultSection } from '#/pages/search/components/search-result';

type RenderBottomSectionOptions = {
  results?: Character[];
  hasBeenSearched?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  currentPage?: number;
  totalPages?: number;
};

export const renderBottomSection = (
  options: RenderBottomSectionOptions = {}
) => {
  const {
    results = [],
    hasBeenSearched = false,
    isLoading = false,
    error = null,
    currentPage = 0,
    totalPages = 0,
  } = options;

  const { container } = render(
    <MemoryRouter>
      <SearchResultSection
        results={results}
        hasBeenSearched={hasBeenSearched}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={function (): void {
          throw new Error('Function not implemented.');
        }}
        onSelectCharacter={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </MemoryRouter>
  );

  return {
    cards: container.querySelectorAll('.card'),
    loadingElement: screen.queryByText(/loading/i),
    noResultsElement: screen.queryByText(/no results found/i),
    errorElement: error ? screen.queryByText(error.message) : null,
  };
};
