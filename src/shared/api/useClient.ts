import type { ApiResponse, Character } from '#/types';
import { useCallback, useState } from 'react';

const ITEMS_PER_PAGE = 10;
const BASE_URL = 'https://swapi.py4e.com/api/people';

const fetchCharacters = async (
  searchTerm: string,
  page: number
): Promise<ApiResponse> => {
  const SEARCH_ENDPOINT = `${BASE_URL}/?search=${encodeURIComponent(searchTerm)}&page=${page}`;
  const PAGE_ENDPOINT = `${BASE_URL}/?page=${page}`;

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

const getCharacterDetails = async (id: string): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.status}`);
  }
  return response.json();
};

export const useFetchAll = () => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState<Character[]>([]);
  const [hasBeenSearched, setHasBeenSearched] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = useCallback(async (searchTerm: string, page: number) => {
    setLoading(true);
    setResults([]);
    setError(null);
    setTotalPages(1);
    try {
      const { results, totalPages } = await fetchCharacters(searchTerm, page);
      setResults(results);
      setTotalPages(totalPages);
      setHasBeenSearched(true);
      setLoading(false);
      return { results, totalPages };
    } catch (error) {
      setError(error);
    }
  }, []);

  return { loadData, isLoading, results, totalPages, hasBeenSearched, error };
};

export const useFetchItem = () => {
  const [isLoading, setLoading] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<Error | null | unknown>(null);

  const loadData = useCallback(async (id: string) => {
    setLoading(true);
    setCharacter(null);
    setError(null);
    try {
      const data = await getCharacterDetails(id);
      setCharacter(data);
      setLoading(false);
      return { character: data };
    } catch (error) {
      setError(error);
    }
  }, []);

  return { loadData, isLoading, character, error };
};
