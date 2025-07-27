import type { ApiResponse } from '#/types';
import { useCallback } from 'react';

const ITEMS_PER_PAGE = 10;

const fetchCharacters = async (
  searchTerm: string,
  page: number
): Promise<ApiResponse> => {
  const SEARCH_ENDPOINT = `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(searchTerm)}&page=${page}`;
  const PAGE_ENDPOINT = `https://swapi.py4e.com/api/people/?page=${page}`;

  const url = searchTerm ? SEARCH_ENDPOINT : PAGE_ENDPOINT;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return {
    results: data.results,
    totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
  };
};

export const useClient = () => {
  const loadData = useCallback(async (searchTerm: string, page: number) => {
    const { results, totalPages } = await fetchCharacters(searchTerm, page);
    return { results, totalPages };
  }, []);

  return { loadData };
};
