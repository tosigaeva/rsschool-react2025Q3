import { vi } from 'vitest';
import {
  mockSuccessResponse,
  renderApp,
  type ResponseLike,
} from './__tests__/renderApp.tsx';
import { screen, waitFor } from '@testing-library/dom';
import { act } from '@testing-library/react';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

describe('App', () => {
  describe('Integration Tests', () => {
    it('makes initial API call on component mount', async () => {
      const mockResults: Person[] = [
        { name: 'Luke Skywalker', birth_year: '19BBY', gender: 'male' },
      ];
      const mockFetch = vi
        .fn()
        .mockResolvedValue(mockSuccessResponse(mockResults));

      renderApp({ mockFetch });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people/'
      );

      await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });
    });

    it('handles search term from localStorage on initial load', async () => {
      const testTerm = 'Luke Skywalker';
      const mockResults: Person[] = [
        { name: 'Luke Skywalker', birth_year: '19BBY', gender: 'male' },
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

      const fetchPromise = new Promise<ResponseLike<{ results: Person[] }>>(
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
  });
});
