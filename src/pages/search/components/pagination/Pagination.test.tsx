import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Pagination } from '#/pages/search/components/pagination';

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

      // Check that buttons show correct page numbers
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
      const currentPageButton = pageButtons[currentPage - 1]; // 0-indexed

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

      // Check that non-current page buttons are enabled
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

      // Check that current page is disabled
      expect(pageButtons[currentPage - 1]).toBeDisabled();

      // Check that other pages are enabled
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

      // Click on page 2 (index 1)
      pageButtons[1].click();
      expect(mockOnClick).toHaveBeenCalledWith(2);
      expect(mockOnClick).toHaveBeenCalledTimes(1);

      // Click on page 3 (index 2)
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

      // Try to click on current page button
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

      // Click on different pages
      pageButtons[1].click(); // Page 2
      pageButtons[2].click(); // Page 3
      pageButtons[3].click(); // Page 4
      pageButtons[4].click(); // Page 5

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
      const currentPage = 5; // Greater than total pages

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );

      const pageButtons = screen.getAllByRole('button');
      expect(pageButtons).toHaveLength(3);

      // All buttons should be enabled since current page doesn't exist
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

      // All buttons should be enabled since current page is 0
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
