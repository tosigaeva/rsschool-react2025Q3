import type { Character } from './character.ts';

export interface TopSectionProps {
  onSearch: (term: string) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface BottomSectionProps {
  results: Character[];
  hasSearch: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelectCharacter: (character: Character) => void;
}

export interface CardProps {
  character: Character;
  onClick: () => void;
}

export interface CardDetailsProps {
  details: Character | null;
  onClick: () => void;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}
