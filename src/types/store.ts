import type { Character } from '#/types/character.ts';

export interface SelectionStore {
  selected: Character[];
  toggleSelection: (character: Character) => void;
  clearSelection: () => void;
}
