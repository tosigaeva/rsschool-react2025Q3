import type { Character } from '#/types';

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useSelectionStore } from './useSelectionStore';

const mockCharacter1: Character = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

const mockCharacter2: Character = {
  name: 'Leia Organa',
  birth_year: '19BBY',
  gender: 'female',
  url: 'https://swapi.dev/api/people/5/',
};

describe('useSelectionStore', () => {
  beforeEach(() => {
    act(() => {
      useSelectionStore.getState().clearSelection();
    });
  });

  it('should have empty selected array as initial state', () => {
    const { result } = renderHook(() => useSelectionStore());

    expect(result.current.selected).toEqual([]);
  });

  it('should toggle character selection correctly', () => {
    const { result } = renderHook(() => useSelectionStore());

    expect(result.current.selected).toEqual([]);

    act(() => {
      result.current.toggleSelection(mockCharacter1);
    });

    expect(result.current.selected).toHaveLength(1);
    expect(result.current.selected[0]).toEqual(mockCharacter1);

    act(() => {
      result.current.toggleSelection(mockCharacter2);
    });

    expect(result.current.selected).toHaveLength(2);
    expect(result.current.selected).toContainEqual(mockCharacter1);
    expect(result.current.selected).toContainEqual(mockCharacter2);

    act(() => {
      result.current.toggleSelection(mockCharacter1);
    });

    expect(result.current.selected).toHaveLength(1);
    expect(result.current.selected[0]).toEqual(mockCharacter2);
  });

  it('should clear all selections when clearSelection is called', () => {
    const { result } = renderHook(() => useSelectionStore());

    act(() => {
      result.current.toggleSelection(mockCharacter1);
      result.current.toggleSelection(mockCharacter2);
    });

    expect(result.current.selected).toHaveLength(2);

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selected).toEqual([]);
  });
});
