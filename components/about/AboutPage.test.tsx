import { render, screen } from "@testing-library/react";
import { AboutPage } from "#/components/about/AboutPage";
import { describe, it, expect } from "vitest";

describe("AboutPage", () => {
  it("renders the about page content", () => {
    render(<AboutPage />);
    expect(screen.getByText("About me")).toBeInTheDocument();
  });

  it("renders content within a paragraph element", () => {
    render(<AboutPage />);
    const paragraph = screen.getByText("About me");
    expect(paragraph.tagName).toBe("H2");
  });

  it("renders exactly the expected text", () => {
    render(<AboutPage />);
    expect(screen.getByText("About me")).toHaveTextContent("About me");
  });
});
