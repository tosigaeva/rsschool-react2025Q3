
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiResponse, Character } from '../../types';

const ITEMS_PER_PAGE = 10;
const BASE_URL = 'https://swapi.py4e.com/api/people';

export const fetchCharacters = async (
  searchTerm: string,
  page: number
): Promise<ApiResponse> => {
  const url = `${BASE_URL}/?page=${page}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Request failed: ${response.status} ${response.statusText}`);
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

export const fetchCharacterDetails = async (id: string): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.status}`);
  }
  return response.json();
};

export const useCharactersQuery = (searchTerm: string, page: number) =>
  useQuery({
    queryKey: ['characters', searchTerm, page],
    queryFn: () => fetchCharacters(searchTerm, page),
    enabled: page > 0,
  });

export const useCharacterDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterDetails(id),
    enabled: !!id,
  });

export const useInvalidateCharacters = () => {
  const client = useQueryClient();
  return () => client.invalidateQueries({ queryKey: ['characters'] });
};
