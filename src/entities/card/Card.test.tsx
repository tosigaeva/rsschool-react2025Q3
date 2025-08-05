import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Card } from '#/entities/card/index.ts';
import userEvent from '@testing-library/user-event';
import type { Character } from '#/types';

type RenderCardProps = {
  character?: Character;
  mockOnClick?: () => void;
};

const renderCard = (props: RenderCardProps = {}) => {
  const { character = mockCharacter, mockOnClick = vi.fn() } = props;

  return render(
    <MemoryRouter>
      <Card character={character} onClick={mockOnClick} />
    </MemoryRouter>
  );
};

const mockCharacter = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  url: 'http://localhost:8080/api/people/1',
};

describe('Card', () => {
  describe('Rendering Tests', () => {
    it('displays item name and description correctly', () => {
      renderCard();

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

      renderCard({ character: emptyCharacter });

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('');
      expect(screen.getByText('Year of birth:')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();

      const emptyTextNodes = screen.getAllByText((content) => content === '');
      expect(emptyTextNodes.length).toBeGreaterThanOrEqual(2);
    });

    it('handles onClick callback', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      renderCard({ mockOnClick });

      const linkElement = screen.getByRole('link');

      await user.click(linkElement);

      expect(mockOnClick).toHaveBeenCalled();
    });
  });
});
