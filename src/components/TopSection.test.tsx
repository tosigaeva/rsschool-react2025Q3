import { mockLocalStorage } from '../__tests__/mockLocalStorage';
import { renderTopSection } from '../__tests__/renderTopSection';

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
});
