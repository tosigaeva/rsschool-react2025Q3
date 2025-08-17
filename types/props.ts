import type { Character } from './character.ts';

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
}
