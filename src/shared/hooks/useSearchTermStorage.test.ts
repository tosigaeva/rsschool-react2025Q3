import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';

import useSearchTermStorage from './useSearchTermStorage';

describe('useSearchTermStorage', () => {
  let mockStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with empty string when localStorage is empty', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      expect(result.current[0]).toBe('');
    });

    it('should initialize with value from localStorage', () => {
      mockStorage.getItem.mockReturnValue('initial value');

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      expect(result.current[0]).toBe('initial value');
    });

    it('should handle null value from localStorage', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      expect(result.current[0]).toBe('');
      expect(mockStorage.getItem).toHaveBeenCalledWith('testKey');
    });
  });

  describe('State Updates', () => {
    it('should update state and localStorage when setTerm is called', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      act(() => {
        result.current[1]('new value');
      });

      expect(result.current[0]).toBe('new value');
      expect(mockStorage.setItem).toHaveBeenCalledWith('testKey', 'new value');
    });

    it('should update localStorage multiple times when state changes', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      act(() => {
        result.current[1]('first value');
      });

      act(() => {
        result.current[1]('second value');
      });

      act(() => {
        result.current[1]('third value');
      });

      expect(result.current[0]).toBe('third value');
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        'first value'
      );
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        'second value'
      );
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        'third value'
      );
      expect(mockStorage.setItem).toHaveBeenLastCalledWith(
        'testKey',
        'third value'
      );
    });

    it('should handle empty string updates', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      act(() => {
        result.current[1]('');
      });

      expect(result.current[0]).toBe('');
      expect(mockStorage.setItem).toHaveBeenCalledWith('testKey', '');
    });
  });

  describe('Key Changes', () => {
    it('should use different keys for different instances', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result: result1 } = renderHook(() =>
        useSearchTermStorage('key1')
      );
      const { result: result2 } = renderHook(() =>
        useSearchTermStorage('key2')
      );

      act(() => {
        result1.current[1]('value1');
        result2.current[1]('value2');
      });

      expect(mockStorage.setItem).toHaveBeenCalledWith('key1', 'value1');
      expect(mockStorage.setItem).toHaveBeenCalledWith('key2', 'value2');
    });

    it('should handle key changes in the same hook instance', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result, rerender } = renderHook(
        ({ key }) => useSearchTermStorage(key),
        { initialProps: { key: 'initialKey' } }
      );

      act(() => {
        result.current[1]('some value');
      });

      rerender({ key: 'newKey' });

      expect(result.current[0]).toBe('some value');
      expect(mockStorage.setItem).toHaveBeenCalledWith('newKey', 'some value');
    });
  });

  describe('Return Value', () => {
    it('should return a tuple with state and setter function', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      expect(Array.isArray(result.current)).toBe(true);
      expect(result.current).toHaveLength(2);
      expect(typeof result.current[0]).toBe('string');
      expect(typeof result.current[1]).toBe('function');
    });

    it('should return the correct types', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      const [term, setTerm] = result.current;

      expect(typeof term).toBe('string');
      expect(typeof setTerm).toBe('function');
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in values', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      act(() => {
        result.current[1](specialValue);
      });

      expect(result.current[0]).toBe(specialValue);
      expect(mockStorage.setItem).toHaveBeenCalledWith('testKey', specialValue);
    });

    it('should handle very long strings', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      const longString = 'a'.repeat(1000);

      act(() => {
        result.current[1](longString);
      });

      expect(result.current[0]).toBe(longString);
      expect(mockStorage.setItem).toHaveBeenCalledWith('testKey', longString);
    });

    it('should handle unicode characters', () => {
      mockStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useSearchTermStorage('testKey'));

      const unicodeValue = '🚀🌟🎉中文русский';

      act(() => {
        result.current[1](unicodeValue);
      });

      expect(result.current[0]).toBe(unicodeValue);
      expect(mockStorage.setItem).toHaveBeenCalledWith('testKey', unicodeValue);
    });
  });
});
