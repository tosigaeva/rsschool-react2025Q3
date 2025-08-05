import { create } from 'zustand';
import type { SelectionStore } from '#/types';

export const useSelectionStore = create<SelectionStore>((set) => ({
  selected: [],
  toggleSelection: (character) =>
    set((state) => {
      const isSelected = state.selected.some(
        (item) => item.url === character.url
      );
      return {
        selected: isSelected
          ? state.selected.filter((item) => item.url !== character.url)
          : [...state.selected, character],
      };
    }),
  clearSelection: () => set({ selected: [] }),
}));
