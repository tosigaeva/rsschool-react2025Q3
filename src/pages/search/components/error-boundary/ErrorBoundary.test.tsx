import { fireEvent } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '#/pages/search/components/error-boundary/ErrorBoundary.tsx';
import { vi } from 'vitest';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  describe('Error Catching Tests', () => {
    it('catches and handles JavaScript errors in child components', () => {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /try again/i })
      ).toBeInTheDocument();
    });

    it('displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('logs error to console', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Error Recovery Tests', () => {
    it('recovers from error when Try again button is clicked', () => {
      const SafeComponent = () => <div>Recovered</div>;

      const { rerender } = render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

      rerender(
        <ErrorBoundary>
          <SafeComponent />
        </ErrorBoundary>
      );

      fireEvent.click(screen.getByRole('button', { name: /try again/i }));

      expect(
        screen.queryByText(/something went wrong/i)
      ).not.toBeInTheDocument();
      expect(screen.getByText(/recovered/i)).toBeInTheDocument();
    });
  });
});
