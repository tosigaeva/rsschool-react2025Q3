import { vi } from 'vitest';
import {
  mockErrorResponse,
  mockSuccessResponse,
  renderApp,
  type ResponseLike,
} from '#/__tests__/renderApp.tsx';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { mockLocalStorage } from '#/__tests__/mockLocalStorage.ts';
import type { Character } from '#/types';

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage(),
  writable: true,
});

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Integration Tests', () => {
    it('makes initial API call on component mount', async () => {
      const mockResults: Character[] = [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          url: 'http://localhost:8080',
        },
      ];
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockSuccessResponse(mockResults));

      renderApp({ mockFetch });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people/?page=1'
      );

      await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });
    });

    it('handles search term from localStorage on initial load', async () => {
      const testTerm = 'Luke Skywalker';
      const mockResults: Character[] = [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          url: 'http://localhost:8080',
        },
      ];
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockSuccessResponse(mockResults));

      renderApp({ mockFetch, localStorageTerm: testTerm });

      await waitFor(() => {
        expect(screen.getByDisplayValue(testTerm)).toBeInTheDocument();
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`search=${encodeURIComponent(testTerm)}`)
      );
    });

    it('manages loading states during API calls', async () => {
      let resolveFetch: () => void;

      const fetchPromise = new Promise<ResponseLike<{ results: Character[] }>>(
        (resolve) => {
          resolveFetch = () => resolve(mockSuccessResponse([]));
        }
      );

      const mockFetch = vi.fn().mockReturnValue(fetchPromise);

      const { getLoading } = renderApp({ mockFetch });

      expect(getLoading()).toBeInTheDocument();

      act(() => {
        resolveFetch();
      });

      await waitFor(() => {
        expect(getLoading()).not.toBeInTheDocument();
      });
    });

    it('saves search term to localStorage when search button is clicked', async () => {
      const testTerm = 'C-3PO';
      const mockFetch = vi.fn().mockResolvedValue(mockSuccessResponse([]));

      const { input, button } = renderApp({ mockFetch });

      await act(async () => {
        fireEvent.change(input, { target: { value: testTerm } });
        fireEvent.click(button);
      });

      expect(localStorage.getItem('searchTerm')).toBe(testTerm);
    });
  });

  describe('API Integration Tests', () => {
    it('calls API with correct parameters', async () => {
      const testTerm = 'Luke Skywalker';
      const mockResults: Character[] = [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          url: 'http://localhost:8080',
        },
      ];
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockSuccessResponse(mockResults));

      const { input, button } = renderApp({ mockFetch });

      await act(async () => {
        fireEvent.change(input, { target: { value: testTerm } });
        fireEvent.click(button);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`search=${encodeURIComponent(testTerm)}`)
      );

      await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });
    });

    it('handles successful API responses', async () => {
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
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockSuccessResponse(mockResults));

      renderApp({ mockFetch });

      await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('C-3PO')).toBeInTheDocument();
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/no results found/i)).not.toBeInTheDocument();
      });
    });

    it('handles API error responses', async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockErrorResponse(404, 'Not Found'));

      renderApp({ mockFetch });

      await waitFor(() => {
        expect(
          screen.getByText(/request failed: 404 not found/i)
        ).toBeInTheDocument();
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      });
    });

    it('logs error to console when handleSearch fails', async () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const mockFetch = vi
        .fn()
        .mockRejectedValue(new Error('Search network error'));

      const { input, button } = renderApp({ mockFetch });

      await act(async () => {
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(button);
      });

      await waitFor(() => {
        expect(screen.getByText(/search network error/i)).toBeInTheDocument();
      });

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('State Management Tests', () => {
    it('updates component state based on API responses', async () => {
      const mockResults = [
        {
          name: 'C-3PO',
          birth_year: '112BBY',
          gender: 'n/a',
          url: 'http://localhost:8080',
        },
      ];
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockSuccessResponse(mockResults));

      renderApp({ mockFetch });

      await waitFor(() => {
        expect(screen.getByText('C-3PO')).toBeInTheDocument();
      });
    });

    it('manages search term state correctly', async () => {
      const testTerm = 'C-3PO';
      const mockFetch = vi.fn().mockResolvedValue(mockSuccessResponse([]));

      const { input, button } = renderApp({ mockFetch });

      await act(async () => {
        fireEvent.change(input, { target: { value: testTerm } });
        fireEvent.click(button);
      });

      expect(localStorage.getItem('searchTerm')).toBe(testTerm);
      expect(input).toHaveValue(testTerm);
    });
  });

  describe('Error Handling Tests', () => {
    it('shows appropriate error for 500 status code', async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockErrorResponse(500, 'Internal Server Error'));

      renderApp({ mockFetch });

      await waitFor(() => {
        expect(
          screen.getByText(/request failed: 500 internal server error/i)
        ).toBeInTheDocument();
      });
    });

    it('throws error if shouldThrow is set to true', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        renderApp();
        fireEvent.click(screen.getByRole('button', { name: /throw error/i }));
      }).toThrow('Simulated render error');

      consoleErrorSpy.mockRestore();
    });
  });
});
