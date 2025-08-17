import type { Character } from "#/types";

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { CardDetails } from "./CardDetails";

type RenderCardDetailsProps = {
  details: Character;
  mockOnClick: () => void;
};

const renderCardDetails = (props: RenderCardDetailsProps) => {
  return render(
    <CardDetails details={props.details} onClick={props.mockOnClick} />,
  );
};

const mockCharacter: Character = {
  name: "Luke Skywalker",
  birth_year: "19BBY",
  gender: "male",
  url: "http://localhost:8080/api/people/1",
};

describe("CardDetails", () => {
  it("should render character details when details is provided", () => {
    renderCardDetails({ details: mockCharacter, mockOnClick: vi.fn() });

    Object.entries(mockCharacter).forEach(([key, value]) => {
      expect(screen.getByText(`${key}:`)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it("should call onClick when close button is clicked", () => {
    const mockOnClick = vi.fn();
    renderCardDetails({ details: mockCharacter, mockOnClick });

    const closeButton = screen.getByTestId("button-close-card-details");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
