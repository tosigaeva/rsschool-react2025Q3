import { render, screen } from '@testing-library/react';
import BottomSection from '../components/BottomSection';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

type RenderBottomSectionOptions = {
  results?: Person[];
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
    <BottomSection
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
