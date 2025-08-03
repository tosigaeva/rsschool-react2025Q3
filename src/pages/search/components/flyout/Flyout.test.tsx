import { Flyout } from '#/pages/search/components/flyout/Flyout.tsx';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useSelectionStore } from '#/shared/store/useSelectionStore.ts';
import type { Character } from '#/types';

vi.mock('#/shared/store/useSelectionStore.ts', () => ({
  useSelectionStore: vi.fn(),
}));

const mockedUseSelectionStore = useSelectionStore as vi.Mock;

describe('Flyout', () => {
  const mockClearSelection = vi.fn();

  const renderWithSelection = (selected: Character[] = []) => {
    mockedUseSelectionStore.mockImplementation((selector) =>
      selector({
        selected,
        clearSelection: mockClearSelection,
      })
    );

    return render(<Flyout />);
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not render if no items are selected', () => {
    renderWithSelection([]);

    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it('renders when items are selected', () => {
    renderWithSelection([
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        url: 'url1',
      },
    ]);

    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('calls clearSelection when "Unselect all" is clicked', () => {
    renderWithSelection([
      { name: 'C-3PO', birth_year: '112BBY', gender: 'n/a', url: 'url2' },
    ]);

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectButton);

    expect(mockClearSelection).toHaveBeenCalled();
  });
});
