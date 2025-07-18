import { renderBottomSection } from '../__tests__/renderBottomSection.tsx';
import { screen } from '@testing-library/react';

describe('BottomSection', () => {
  const mockResults = [
    { name: 'Luke Skywalker', birth_year: '19BBY', gender: 'male' },
    { name: 'C-3PO', birth_year: '112BBY', gender: 'n/a' },
  ];

  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', () => {
      const { cards } = renderBottomSection({
        results: mockResults,
        hasSearch: true,
      });

      expect(cards).toHaveLength(mockResults.length);
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('C-3PO')).toBeInTheDocument();
    });

    it('displays "no results" message when data array is empty', () => {
      const { cards, noResultsElement } = renderBottomSection({
        results: [],
        hasSearch: true,
      });

      expect(noResultsElement).toBeInTheDocument();
      expect(cards).toHaveLength(0);
    });

    it('shows loading state while fetching data', () => {
      const { cards, loadingElement } = renderBottomSection({
        isLoading: true,
      });

      expect(loadingElement).toBeInTheDocument();
      expect(cards).toHaveLength(0);
    });
  });
});
