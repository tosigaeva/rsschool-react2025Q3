import type { ApiResponse } from '../../src/types';

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
