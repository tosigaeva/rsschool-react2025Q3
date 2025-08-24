import { create } from 'zustand';

import type { StoreFormData } from '@/shared/validation-schema';

export type FormEntry = {
  data: StoreFormData;
  formType: 'hook' | 'uncontrolled';
  id: number;
  isNew?: boolean;
  timestamp: Date;
};

type FormEntryStore = {
  addEntry: (entry: Omit<FormEntry, 'id' | 'isNew' | 'timestamp'>) => void;
  entries: FormEntry[];
  markAllAsSeen: () => void;
  markAsSeen: (id: number) => void;
  nextId: number;
};

export const useFormStore = create<FormEntryStore>((set) => ({
  addEntry: (entry) =>
    set((state) => ({
      entries: [
        ...state.entries,
        {
          ...entry,
          id: state.nextId,
          isNew: true,
          timestamp: new Date(),
        },
      ],
      nextId: state.nextId + 1,
    })),
  entries: [],
  markAllAsSeen: () =>
    set((state) => ({
      entries: state.entries.map((entry) => ({
        ...entry,
        isNew: false,
      })),
    })),

  markAsSeen: (id) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, isNew: false } : entry
      ),
    })),

  nextId: 1,
}));
