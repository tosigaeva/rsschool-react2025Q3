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
}

export interface CardProps {
  name: string;
  birth_year: string;
  gender: string;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}
