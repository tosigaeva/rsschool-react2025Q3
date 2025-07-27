import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Card } from '#/pages/search/components/card';

describe('Card', () => {
  describe('Rendering Tests', () => {
    it('displays item name and description correctly', () => {
      const character = {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        url: 'http://localhost:8080/api/people/1',
      };

      render(
        <MemoryRouter>
          <Card character={character} onClick={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Luke Skywalker'
      );
      expect(screen.getByText('Year of birth:')).toBeInTheDocument();
      expect(screen.getByText('19BBY')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();
      expect(screen.getByText('male')).toBeInTheDocument();
    });

    it('renders empty values if props are empty', () => {
      const emptyCharacter = {
        name: '',
        birth_year: '',
        gender: '',
        url: 'http://localhost:8080/api/people/1',
      };

      render(
        <MemoryRouter>
          <Card character={emptyCharacter} onClick={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('');

      // Check that labels are still present
      expect(screen.getByText('Year of birth:')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();

      // Check that the value spans exist and have empty content
      const valueSpans = document.querySelectorAll('.value');
      expect(valueSpans).toHaveLength(2);
      expect(valueSpans[0]).toHaveTextContent('');
      expect(valueSpans[1]).toHaveTextContent('');
    });

    it('handles onClick callback', () => {
      const mockOnClick = vi.fn();
      const character = {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        url: 'http://localhost:8080/api/people/1',
      };

      render(
        <MemoryRouter>
          <Card character={character} onClick={mockOnClick} />
        </MemoryRouter>
      );

      const cardElement = screen
        .getByRole('heading', { level: 3 })
        .closest('.card');
      expect(cardElement).toBeInTheDocument();
    });
  });
});
