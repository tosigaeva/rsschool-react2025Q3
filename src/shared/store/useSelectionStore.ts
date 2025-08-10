import type { SelectionStore } from '#/types';

import { create } from 'zustand';

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
