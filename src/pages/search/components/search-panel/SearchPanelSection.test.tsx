import { fireEvent } from '@testing-library/dom';
import { mockLocalStorage } from '#/__tests__/mockLocalStorage.ts';
import { renderTopSection } from '#/__tests__/renderTopSection.tsx';

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage(),
  writable: true,
});

describe('TopSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendering Tests', () => {
    it('renders search input and search button', () => {
      const { input, button } = renderTopSection();

      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('displays previously saved search term from localStorage on mount', () => {
      const testTerm = 'Luke Skywalker';
      const { input } = renderTopSection({ localStorageTerm: testTerm });

      expect(input).toHaveValue(testTerm);
    });

    it('shows empty input when no saved term exists', () => {
      const { input } = renderTopSection();

      expect(input).toHaveValue('');
    });
  });

  describe('User Interaction Tests', () => {
    it('updates input value when user types', () => {
      const { input } = renderTopSection();
      const testValue = 'Luck';

      fireEvent.change(input, { target: { value: testValue } });
      expect(input).toHaveValue(testValue);
    });

    it('trims whitespace from input before calling onSearch', () => {
      const { input, button, mockOnSearch } = renderTopSection();

      fireEvent.change(input, { target: { value: '   Luke   ' } });
      fireEvent.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('Luke', 1);
    });

    it('triggers search callback with correct parameters', () => {
      const { input, button, mockOnSearch } = renderTopSection();
      const testValue = 'Luke';

      fireEvent.change(input, { target: { value: testValue } });
      fireEvent.click(button);

      expect(mockOnSearch).toHaveBeenCalledTimes(1);
      expect(mockOnSearch).toHaveBeenCalledWith(testValue, 1);
    });
  });
});
