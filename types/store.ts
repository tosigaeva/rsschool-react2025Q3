import { Character } from '#/types/character';

export interface SelectionStore {
  selected: Character[];
  toggleSelection: (character: Character) => void;
  clearSelection: () => void;
}
