import { render, screen } from '@testing-library/react';
import { Pagination } from '#/pages/search/components/pagination';
import { vi } from 'vitest';

describe('Pagination', () => {
  describe('Rendering Tests', () => {
    it('renders correct number of page buttons', () => {
      const mockOnClick = vi.fn();
      const totalPages = 5;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons).toHaveLength(totalPages);

      pageButtons.forEach((button, index) => {
        expect(button).toHaveTextContent(String(index + 1));
      });
    });

    it('disables current page button', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 2;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      const currentPageButton = pageButtons[currentPage - 1];
      expect(currentPageButton).toBeDisabled();
      expect(currentPageButton).toHaveTextContent(String(currentPage));
    });

    it('enables non-current page buttons', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 2;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');

      pageButtons.forEach((button, index) => {
        const pageNumber = index + 1;
        if (pageNumber !== currentPage) {
          expect(button).not.toBeDisabled();
        }
      });
    });

    it('renders single page correctly', () => {
      const mockOnClick = vi.fn();
      const totalPages = 1;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons).toHaveLength(1);
      expect(pageButtons[0]).toHaveTextContent('1');
      expect(pageButtons[0]).toBeDisabled();
    });

    it('renders multiple pages correctly', () => {
      const mockOnClick = vi.fn();
      const totalPages = 10;
      const currentPage = 5;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons).toHaveLength(10);

      expect(pageButtons[currentPage - 1]).toBeDisabled();

      pageButtons.forEach((button, index) => {
        const pageNumber = index + 1;
        if (pageNumber !== currentPage) {
          expect(button).not.toBeDisabled();
        }
      });
    });
  });

  describe('Interaction Tests', () => {
    it('calls onClick with correct page number when button is clicked', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');

      pageButtons[1].click();
      expect(mockOnClick).toHaveBeenCalledWith(2);
      expect(mockOnClick).toHaveBeenCalledTimes(1);

      pageButtons[2].click();
      expect(mockOnClick).toHaveBeenCalledWith(3);
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });

    it('does not call onClick when current page button is clicked', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 2;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      const currentPageButton = pageButtons[currentPage - 1];

      currentPageButton.click();
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('calls onClick multiple times for different pages', () => {
      const mockOnClick = vi.fn();
      const totalPages = 5;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');

      pageButtons[1].click();
      pageButtons[2].click();
      pageButtons[3].click();
      pageButtons[4].click();
      expect(mockOnClick).toHaveBeenCalledTimes(4);
      expect(mockOnClick).toHaveBeenNthCalledWith(1, 2);
      expect(mockOnClick).toHaveBeenNthCalledWith(2, 3);
      expect(mockOnClick).toHaveBeenNthCalledWith(3, 4);
      expect(mockOnClick).toHaveBeenNthCalledWith(4, 5);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero total pages', () => {
      const mockOnClick = vi.fn();
      const totalPages = 0;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.queryAllByRole('button');
      expect(pageButtons).toHaveLength(0);
    });

    it('handles current page greater than total pages', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 5;
      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons).toHaveLength(3);

      pageButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it('handles current page as zero', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 0;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons).toHaveLength(3);

      pageButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });
  });

  describe('Accessibility Tests', () => {
    it('has proper button roles and labels', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons).toHaveLength(3);

      pageButtons.forEach((button, index) => {
        const pageNumber = index + 1;
        expect(button).toHaveTextContent(String(pageNumber));
      });
    });

    it('has proper disabled state for current page', () => {
      const mockOnClick = vi.fn();
      const totalPages = 3;
      const currentPage = 2;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      const currentPageButton = pageButtons[currentPage - 1];

      expect(currentPageButton).toBeDisabled();
      expect(currentPageButton).toHaveAttribute('disabled');
    });
  });
});
