import type { Character } from "#/types";

import { fireEvent, render, screen } from "@testing-library/react";
import { useSelectionStore } from "#/shared/store/useSelectionStore.ts";
import { vi } from "vitest";

import { Flyout } from "./Flyout.tsx";

vi.mock("#/shared/store/useSelectionStore.ts", () => ({
  useSelectionStore: vi.fn(),
}));

const mockedUseSelectionStore = useSelectionStore as unknown as ReturnType<
  typeof vi.fn
>;

const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

Object.defineProperty(global.URL, "createObjectURL", {
  value: mockCreateObjectURL,
  writable: true,
});

Object.defineProperty(global.URL, "revokeObjectURL", {
  value: mockRevokeObjectURL,
  writable: true,
});

global.Blob = vi.fn().mockImplementation((content, options) => ({
  content,
  options,
}));

describe("Flyout", () => {
  const mockClearSelection = vi.fn();

  const renderWithSelection = (selected: Character[] = []) => {
    mockedUseSelectionStore.mockImplementation((selector) =>
      selector({
        selected,
        clearSelection: mockClearSelection,
      }),
    );

    return render(<Flyout />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateObjectURL.mockReturnValue("mock-url");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not render if no items are selected", () => {
    renderWithSelection([]);

    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it("renders when items are selected", () => {
    renderWithSelection([
      {
        name: "Luke Skywalker",
        birth_year: "19BBY",
        gender: "male",
        url: "url1",
      },
    ]);

    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /unselect all/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download/i }),
    ).toBeInTheDocument();
  });

  it("renders correct count for multiple items", () => {
    renderWithSelection([
      {
        name: "Luke Skywalker",
        birth_year: "19BBY",
        gender: "male",
        url: "url1",
      },
      {
        name: "Leia Organa",
        birth_year: "19BBY",
        gender: "female",
        url: "url2",
      },
      {
        name: "Han Solo",
        birth_year: "29BBY",
        gender: "male",
        url: "url3",
      },
    ]);

    expect(screen.getByText(/3 items are selected/i)).toBeInTheDocument();
  });

  it('calls clearSelection when "Unselect all" is clicked', () => {
    renderWithSelection([
      { name: "C-3PO", birth_year: "112BBY", gender: "n/a", url: "url2" },
    ]);

    const unselectButton = screen.getByRole("button", {
      name: /unselect all/i,
    });
    fireEvent.click(unselectButton);

    expect(mockClearSelection).toHaveBeenCalled();
  });

  it("handles download functionality", () => {
    const selectedItems = [
      {
        name: "Luke Skywalker",
        birth_year: "19BBY",
        gender: "male",
        url: "url1",
      },
      {
        name: "Leia Organa",
        birth_year: "19BBY",
        gender: "female",
        url: "url2",
      },
    ];

    renderWithSelection(selectedItems);

    const downloadButton = screen.getByRole("button", { name: /download/i });
    fireEvent.click(downloadButton);

    expect(global.Blob).toHaveBeenCalledWith(
      [
        "name,birth_year,gender,url\nLuke Skywalker,19BBY,male,url1\nLeia Organa,19BBY,female,url2",
      ],
      { type: "text/csv;charset=utf-8;" },
    );

    expect(mockCreateObjectURL).toHaveBeenCalled();
  });
});
