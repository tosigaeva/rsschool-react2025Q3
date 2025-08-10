import type { Character, ApiResponse } from '#/types';

import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { useFetchAll, useFetchItem } from './useClient';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useFetchAll', () => {
    const mockCharacters: Character[] = [
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.py4e.com/api/people/1',
      },
      {
        name: 'Leia Organa',
        birth_year: '19BBY',
        gender: 'female',
        url: 'https://swapi.py4e.com/api/people/5',
      },
    ];

    const mockApiResponse: ApiResponse = {
      results: mockCharacters,
      totalPages: 5,
    };

    it('should initialize with default state', () => {
      const { result } = renderHook(() => useFetchAll());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.results).toEqual([]);
      expect(result.current.hasBeenSearched).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.totalPages).toBe(1);
      expect(typeof result.current.loadData).toBe('function');
    });

    it('should load data successfully with search term', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: mockCharacters,
          count: 50,
        }),
      });

      const { result } = renderHook(() => useFetchAll());

      await act(async () => {
        const response = await result.current.loadData('Luke', 1);
        expect(response).toEqual(mockApiResponse);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.results).toEqual(mockCharacters);
      expect(result.current.hasBeenSearched).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.totalPages).toBe(5);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people/?search=Luke&page=1'
      );
    });

    it('should load data successfully without search term', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: mockCharacters,
          count: 50,
        }),
      });

      const { result } = renderHook(() => useFetchAll());

      await act(async () => {
        const response = await result.current.loadData('', 2);
        expect(response).toEqual(mockApiResponse);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.results).toEqual(mockCharacters);
      expect(result.current.hasBeenSearched).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.totalPages).toBe(5);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people/?page=2'
      );
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Request failed: 404 Not Found';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const { result } = renderHook(() => useFetchAll());

      await act(async () => {
        await result.current.loadData('Luke', 1);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.results).toEqual([]);
      expect(result.current.hasBeenSearched).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
      expect(result.current.totalPages).toBe(1);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(networkError);

      const { result } = renderHook(() => useFetchAll());

      await act(async () => {
        await result.current.loadData('Luke', 1);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.results).toEqual([]);
      expect(result.current.hasBeenSearched).toBe(false);
      expect(result.current.error).toBe(networkError);
      expect(result.current.totalPages).toBe(1);
    });

    it('should reset state when starting new request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: mockCharacters,
          count: 50,
        }),
      });

      const { result } = renderHook(() => useFetchAll());

      await act(async () => {
        await result.current.loadData('Luke', 1);
      });

      expect(result.current.results).toEqual(mockCharacters);
      expect(result.current.hasBeenSearched).toBe(true);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [],
          count: 0,
        }),
      });

      await act(async () => {
        await result.current.loadData('', 1);
      });

      expect(result.current.results).toEqual([]);
      expect(result.current.hasBeenSearched).toBe(true);
      expect(result.current.totalPages).toBe(0);
    });

    it('should encode search terms properly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: mockCharacters,
          count: 50,
        }),
      });

      const { result } = renderHook(() => useFetchAll());

      await act(async () => {
        await result.current.loadData('Luke Skywalker', 1);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people/?search=Luke%20Skywalker&page=1'
      );
    });
  });

  describe('useFetchItem', () => {
    const mockCharacter: Character = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.py4e.com/api/people/1',
    };

    it('should initialize with default state', () => {
      const { result } = renderHook(() => useFetchItem());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.character).toBe(null);
      expect(result.current.error).toBe(null);
      expect(typeof result.current.loadData).toBe('function');
    });

    it('should load character details successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
      });

      const { result } = renderHook(() => useFetchItem());

      await act(async () => {
        const response = await result.current.loadData('1');
        expect(response).toEqual({ character: mockCharacter });
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.character).toEqual(mockCharacter);
      expect(result.current.error).toBe(null);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people/1'
      );
    });

    it('should handle API errors when fetching character details', async () => {
      const errorMessage = 'Failed to fetch character: 404';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const { result } = renderHook(() => useFetchItem());

      await act(async () => {
        await result.current.loadData('999');
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.character).toBe(null);
      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(errorMessage);
    });

    it('should handle network errors when fetching character details', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(networkError);

      const { result } = renderHook(() => useFetchItem());

      await act(async () => {
        await result.current.loadData('1');
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.character).toBe(null);
      expect(result.current.error).toBe(networkError);
    });

    it('should reset state when starting new request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
      });

      const { result } = renderHook(() => useFetchItem());

      await act(async () => {
        await result.current.loadData('1');
      });

      expect(result.current.character).toEqual(mockCharacter);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockCharacter, name: 'Leia Organa' }),
      });

      await act(async () => {
        await result.current.loadData('5');
      });

      expect(result.current.character).toEqual({
        ...mockCharacter,
        name: 'Leia Organa',
      });
    });
  });
});
