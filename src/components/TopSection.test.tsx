import TopSection from './TopSection';
import { render, screen } from '@testing-library/react';
import { mockLocalStorage } from '../__tests__/mockLocalStorage';
import { vi } from 'vitest';

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage(),
  writable: true,
});

describe('TopSection', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
  });

  describe('Rendering Tests', () => {
    it('Renders search input and search button', () => {
      render(<TopSection onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });

    it('Displays previously saved search term from localStorage on mount', () => {
      localStorage.setItem('searchTerm', 'Luke Skywalker');
      render(<TopSection onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toHaveValue('Luke Skywalker');
    });

    it('Shows empty input when no saved term exists', () => {
      render(<TopSection onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });
});
