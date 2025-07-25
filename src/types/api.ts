import type { Character } from './character.ts';

export interface ApiResponse {
  results: Character[];
  count: number;
}
