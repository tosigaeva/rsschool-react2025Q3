import type { Character } from './character.ts';

export interface SearchPanelSectionProps {
  onSearch: (searchTerm: string, currentPage: number) => void;
}

export interface SearchResultSectionProps {
  results: Character[];
  totalPages: number;
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
}
