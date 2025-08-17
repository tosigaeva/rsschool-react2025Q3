import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  describe("Rendering Tests", () => {
    it("should render with correct attributes", () => {
      const mockOnChange = vi.fn();

      render(<Input value="" onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("placeholder", "Search for a character...");
    });
  });

  describe("Interaction Tests", () => {
    it("should call onChange when user types", async () => {
      const mockOnChange = vi.fn();
      const user = userEvent.setup();

      render(<Input value="" onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");

      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe("Props Tests", () => {
    it("should accept value and onChange props", () => {
      const mockOnChange = vi.fn();
      const testValue = "test value";

      render(<Input value={testValue} onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue(testValue);
    });

    it("should update value when prop changes", () => {
      const mockOnChange = vi.fn();

      const { rerender } = render(
        <Input value="initial" onChange={mockOnChange} />,
      );

      let input = screen.getByRole("textbox");
      expect(input).toHaveValue("initial");

      rerender(<Input value="updated" onChange={mockOnChange} />);

      input = screen.getByRole("textbox");
      expect(input).toHaveValue("updated");
    });
  });

  describe("Accessibility Tests", () => {
    it("should be focusable", () => {
      const mockOnChange = vi.fn();

      render(<Input value="" onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      input.focus();

      expect(input).toHaveFocus();
    });

    it("should have correct role", () => {
      const mockOnChange = vi.fn();

      render(<Input value="" onChange={mockOnChange} />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should be accessible via keyboard navigation", async () => {
      const mockOnChange = vi.fn();
      const user = userEvent.setup();

      render(<Input value="" onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      input.focus();
      await user.keyboard("test");

      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle null value gracefully", () => {
      const mockOnChange = vi.fn();

      render(
        <Input value={null as unknown as string} onChange={mockOnChange} />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("should handle undefined value gracefully", () => {
      const mockOnChange = vi.fn();

      render(
        <Input
          value={undefined as unknown as string}
          onChange={mockOnChange}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("should handle number value", () => {
      const mockOnChange = vi.fn();

      render(
        <Input value={123 as unknown as string} onChange={mockOnChange} />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("123");
    });
  });
});
