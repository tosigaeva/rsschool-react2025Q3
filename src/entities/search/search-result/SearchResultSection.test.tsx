import { screen } from '@testing-library/react';
import { expect } from 'vitest';
import { renderBottomSection } from '../../../../__tests__/renderBottomSection.tsx';

describe('BottomSection', () => {
  const mockResults = [
    {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      url: 'http://localhost:8080',
    },
    {
      name: 'C-3PO',
      birth_year: '112BBY',
      gender: 'n/a',
      url: 'http://localhost:8080',
    },
  ];

  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', () => {
      const { cards } = renderBottomSection({
        results: mockResults,
        hasBeenSearched: true,
      });

      expect(cards).toHaveLength(mockResults.length);
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('C-3PO')).toBeInTheDocument();
    });

    it('displays "no results" message when data array is empty', () => {
      const { cards, noResultsElement } = renderBottomSection({
        results: [],
        hasBeenSearched: true,
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

  describe('Data Display Tests', () => {
    it('correctly displays item names and descriptions', () => {
      renderBottomSection({
        results: mockResults,
        hasBeenSearched: true,
      });

      expect(
        screen.getByText((_, el) => el?.textContent === 'Year of birth: 19BBY')
      ).toBeInTheDocument();

      expect(
        screen.getByText((_, el) => el?.textContent === 'Gender: male')
      ).toBeInTheDocument();
    });

    it('handles missing or undefined data gracefully', () => {
      renderBottomSection({
        results: [
          {
            name: 'Unknown',
            birth_year: '',
            gender: '',
            url: 'http://localhost:8080',
          },
        ],
        hasBeenSearched: true,
      });

      expect(screen.getByText('Unknown')).toBeInTheDocument();

      const birthYearValue = screen.getByText('Year of birth:').nextSibling;
      expect(birthYearValue?.textContent).toBe('');

      expect(screen.getByText('Gender:')).toBeInTheDocument();
      const genderValue = screen.getByText('Gender:').nextSibling;
      expect(genderValue?.textContent).toBe('');
    });
  });

  describe('Error Handling Tests', () => {
    it('displays error message when API call fails', () => {
      const { cards, loadingElement, errorElement } = renderBottomSection({
        error: new Error('404 Not Found'),
      });

      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('404 Not Found');
      expect(cards).toHaveLength(0);
      expect(loadingElement).toBeNull();
    });
  });
});
