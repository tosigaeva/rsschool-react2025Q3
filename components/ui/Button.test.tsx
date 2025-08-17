import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  describe('Rendering Tests', () => {
    it('should render with correct text', () => {
      const mockOnClick = vi.fn();

      render(<Button onClick={mockOnClick} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Search');
    });

    it('should have correct button type', () => {
      const mockOnClick = vi.fn();

      render(<Button onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Interaction Tests', () => {
    it('should call onClick when clicked', async () => {
      const mockOnClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props Tests', () => {
    it('should accept onClick function as prop', () => {
      const mockOnClick = vi.fn();

      render(<Button onClick={mockOnClick} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle different onClick functions', async () => {
      const mockOnClick1 = vi.fn();
      const mockOnClick2 = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(<Button onClick={mockOnClick1} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockOnClick1).toHaveBeenCalledTimes(1);
      expect(mockOnClick2).not.toHaveBeenCalled();

      rerender(<Button onClick={mockOnClick2} />);

      await user.click(button);

      expect(mockOnClick1).toHaveBeenCalledTimes(1);
      expect(mockOnClick2).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility Tests', () => {
    it('should be focusable', () => {
      const mockOnClick = vi.fn();

      render(<Button onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });

    it('should have correct role', () => {
      const mockOnClick = vi.fn();

      render(<Button onClick={mockOnClick} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
