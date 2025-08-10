import type { Character } from './character.ts';

export interface SearchPanelSectionProps {
  onSearch: (searchTerm: string) => void;
}

export interface SearchResultSectionProps {
  results: Character[];
  hasBeenSearched: boolean;
  isLoading: boolean;
  error: Error | unknown | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CardProps {
  id: string;
  character: Character;
}

export interface CardDetailsProps {
  details: Character;
  onClick: () => void;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}
