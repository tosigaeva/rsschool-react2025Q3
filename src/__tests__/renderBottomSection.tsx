import { render, screen } from '@testing-library/react';
import SearchResultSection from '../components/SearchResultSection.tsx';
import type { Character } from '../types/interfaces.tsx';

type RenderBottomSectionOptions = {
  results?: Character[];
  hasSearch?: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
};

export const renderBottomSection = (
  options: RenderBottomSectionOptions = {}
) => {
  const {
    results = [],
    hasSearch = false,
    isLoading = false,
    errorMessage = null,
  } = options;

  const { container } = render(
    <SearchResultSection
      results={results}
      hasSearch={hasSearch}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );

  return {
    cards: container.querySelectorAll('.card'),
    loadingElement: screen.queryByText(/loading/i),
    noResultsElement: screen.queryByText(/no results found/i),
    errorElement: errorMessage ? screen.queryByText(errorMessage) : null,
  };
};
