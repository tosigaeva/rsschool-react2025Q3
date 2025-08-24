import { beforeEach, describe, expect, it } from 'vitest';

import type { FormData } from '@/shared/validation-schema';

import { useFormStore } from '@/shared/store/form-store';

describe('Form Store', () => {
  beforeEach(() => {
    useFormStore.setState({
      entries: [],
      nextId: 1,
    });
  });

  it('initializes with empty entries and nextId of 1', () => {
    const state = useFormStore.getState();

    expect(state.entries).toEqual([]);
    expect(state.nextId).toBe(1);
  });

  it('adds new entry with correct structure', () => {
    const mockFormData: FormData = {
      age: 25,
      confirmPassword: 'Password123!',
      country: 'Russia',
      email: 'john@example.com',
      gender: 'male',
      name: 'John Doe',
      password: 'Password123!',
      picture: new FileList(),
      terms: true,
    };

    const { addEntry } = useFormStore.getState();
    addEntry({
      data: mockFormData,
      formType: 'hook',
    });

    const state = useFormStore.getState();

    expect(state.entries).toHaveLength(1);
    expect(state.entries[0]).toEqual({
      data: mockFormData,
      formType: 'hook',
      id: 1,
      isNew: true,
      timestamp: expect.any(Date),
    });
    expect(state.nextId).toBe(2);
  });

  it('increments nextId after adding entry', () => {
    const mockFormData: FormData = {
      age: 25,
      confirmPassword: 'Password123!',
      country: 'Russia',
      email: 'john@example.com',
      gender: 'male',
      name: 'John Doe',
      password: 'Password123!',
      picture: new FileList(),
      terms: true,
    };

    const { addEntry } = useFormStore.getState();

    addEntry({
      data: mockFormData,
      formType: 'hook',
    });

    expect(useFormStore.getState().nextId).toBe(2);

    addEntry({
      data: mockFormData,
      formType: 'uncontrolled',
    });

    expect(useFormStore.getState().nextId).toBe(3);
  });

  it('marks specific entry as seen', () => {
    const mockFormData: FormData = {
      age: 25,
      confirmPassword: 'Password123!',
      country: 'Russia',
      email: 'john@example.com',
      gender: 'male',
      name: 'John Doe',
      password: 'Password123!',
      picture: new FileList(),
      terms: true,
    };

    const { addEntry, markAsSeen } = useFormStore.getState();

    addEntry({
      data: mockFormData,
      formType: 'hook',
    });

    const state = useFormStore.getState();
    expect(state.entries[0].isNew).toBe(true);

    markAsSeen(1);

    const updatedState = useFormStore.getState();
    expect(updatedState.entries[0].isNew).toBe(false);
  });

  it('marks all entries as seen', () => {
    const mockFormData: FormData = {
      age: 25,
      confirmPassword: 'Password123!',
      country: 'Russia',
      email: 'john@example.com',
      gender: 'male',
      name: 'John Doe',
      password: 'Password123!',
      picture: new FileList(),
      terms: true,
    };

    const { addEntry, markAllAsSeen } = useFormStore.getState();

    // Add multiple entries
    addEntry({
      data: mockFormData,
      formType: 'hook',
    });

    addEntry({
      data: mockFormData,
      formType: 'uncontrolled',
    });

    const state = useFormStore.getState();
    expect(state.entries[0].isNew).toBe(true);
    expect(state.entries[1].isNew).toBe(true);

    // Mark all as seen
    markAllAsSeen();

    const updatedState = useFormStore.getState();
    expect(updatedState.entries[0].isNew).toBe(false);
    expect(updatedState.entries[1].isNew).toBe(false);
  });

  it('preserves existing entries when adding new ones', () => {
    const mockFormData1: FormData = {
      age: 25,
      confirmPassword: 'Password123!',
      country: 'Russia',
      email: 'john@example.com',
      gender: 'male',
      name: 'John Doe',
      password: 'Password123!',
      picture: new FileList(),
      terms: true,
    };

    const mockFormData2: FormData = {
      age: 30,
      confirmPassword: 'Password456!',
      country: 'USA',
      email: 'jane@example.com',
      gender: 'female',
      name: 'Jane Doe',
      password: 'Password456!',
      picture: new FileList(),
      terms: true,
    };

    const { addEntry } = useFormStore.getState();

    // Add first entry
    addEntry({
      data: mockFormData1,
      formType: 'hook',
    });

    // Add second entry
    addEntry({
      data: mockFormData2,
      formType: 'uncontrolled',
    });

    const state = useFormStore.getState();

    expect(state.entries).toHaveLength(2);
    expect(state.entries[0].data.name).toBe('John Doe');
    expect(state.entries[1].data.name).toBe('Jane Doe');
    expect(state.entries[0].formType).toBe('hook');
    expect(state.entries[1].formType).toBe('uncontrolled');
  });
});
