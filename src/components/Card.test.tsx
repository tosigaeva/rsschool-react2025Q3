import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card', () => {
  describe('Rendering Tests', () => {
    it('displays item name and description correctly', () => {
      render(<Card name="Luke Skywalker" birth_year="19BBY" gender="male" />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Luke Skywalker'
      );
      expect(screen.getByText('Year of birth:')).toBeInTheDocument();
      expect(screen.getByText('19BBY')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();
      expect(screen.getByText('male')).toBeInTheDocument();
    });

    it('renders empty values if props are empty', () => {
      render(<Card name="" birth_year="" gender="" />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('');
      expect(screen.getByText('Year of birth:')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();

      const valueSpans = screen.getAllByText(
        (content, el) => el?.className === 'value' && content === ''
      );
      expect(valueSpans).toHaveLength(2);
    });
  });
});
