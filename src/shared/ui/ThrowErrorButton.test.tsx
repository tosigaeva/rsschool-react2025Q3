import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ThrowErrorButton from './ThrowErrorButton';

describe('ThrowErrorButton', () => {
  describe('Rendering Tests', () => {
    it('should render with correct text', () => {
      const mockOnClick = vi.fn();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Throw Error');
    });

    it('should have correct button type', () => {
      const mockOnClick = vi.fn();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Interaction Tests', () => {
    it('should call onClick when clicked', async () => {
      const mockOnClick = vi.fn();
      const user = userEvent.setup();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick multiple times when clicked multiple times', async () => {
      const mockOnClick = vi.fn();
      const user = userEvent.setup();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('should be accessible via keyboard', async () => {
      const mockOnClick = vi.fn();
      const user = userEvent.setup();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should be accessible via space key', async () => {
      const mockOnClick = vi.fn();
      const user = userEvent.setup();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props Tests', () => {
    it('should accept onClick function as prop', () => {
      const mockOnClick = vi.fn();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle different onClick functions', async () => {
      const mockOnClick1 = vi.fn();
      const mockOnClick2 = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(<ThrowErrorButton onClick={mockOnClick1} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockOnClick1).toHaveBeenCalledTimes(1);
      expect(mockOnClick2).not.toHaveBeenCalled();

      rerender(<ThrowErrorButton onClick={mockOnClick2} />);

      await user.click(button);

      expect(mockOnClick1).toHaveBeenCalledTimes(1);
      expect(mockOnClick2).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility Tests', () => {
    it('should be focusable', () => {
      const mockOnClick = vi.fn();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });

    it('should have correct role', () => {
      const mockOnClick = vi.fn();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    // it('should call onClick even when it throws an error', async () => {
    //   const mockOnClick = vi.fn().mockImplementation(() => {
    //     throw new Error('Test error');
    //   });
    //   const user = userEvent.setup();
    //
    //   render(<ThrowErrorButton onClick={mockOnClick} />);
    //
    //   const button = screen.getByRole('button');
    //
    //   // The click should still call the function even if it throws
    //   await user.click(button);
    //   expect(mockOnClick).toHaveBeenCalledTimes(1);
    // });

    it('should handle async error functions', async () => {
      const mockOnClick = vi.fn().mockImplementation(async () => {
        throw new Error('Async test error');
      });
      const user = userEvent.setup();

      render(<ThrowErrorButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');

      await user.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
