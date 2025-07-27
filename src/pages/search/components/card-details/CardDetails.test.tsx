import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CardDetails } from './CardDetails';
import type { Character } from '#/types';

type RenderCardDetailsOptions = {
  details?: Character | null;
  mockOnClick?: () => void;
};

export const renderCardDetails = (options: RenderCardDetailsOptions = {}) => {
  const { details = null, mockOnClick = vi.fn() } = options;

  const { container } = render(
    <CardDetails details={details} onClick={mockOnClick} />
  );

  return {
    container,
    mockOnClick,
    getCloseButton: () => screen.queryByRole('button', { name: '×' }),
    getDetailsContainer: () => container.querySelector('.character-details'),
    getDetailsCard: () => container.querySelector('.character-details__card'),
    getDetailLabels: () =>
      container.querySelectorAll('.character-details__label'),
    getDetailValues: () =>
      container.querySelectorAll('.character-details__value'),
  };
};

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  url: 'http://localhost:8080/api/people/1',
};

describe('CardDetails', () => {
  it('should render nothing when details is null', () => {
    const { getDetailsContainer } = renderCardDetails({ details: null });

    expect(getDetailsContainer()).not.toBeInTheDocument();
  });

  it('should render nothing when details is undefined', () => {
    const { getDetailsContainer } = renderCardDetails({ details: undefined });

    expect(getDetailsContainer()).not.toBeInTheDocument();
  });

  it('should render character details when details is provided', () => {
    const { getDetailsContainer, getDetailsCard } = renderCardDetails({
      details: mockCharacter,
    });

    expect(getDetailsContainer()).toBeInTheDocument();
    expect(getDetailsCard()).toBeInTheDocument();
  });

  it('should render all character properties as details', () => {
    const { getDetailLabels, getDetailValues } = renderCardDetails({
      details: mockCharacter,
    });

    const labels = getDetailLabels();
    const values = getDetailValues();

    expect(labels).toHaveLength(4); // name, birth_year, gender, url
    expect(values).toHaveLength(4);

    expect(labels[0]).toHaveTextContent('name:');
    expect(values[0]).toHaveTextContent('Luke Skywalker');
    expect(labels[1]).toHaveTextContent('birth_year:');
    expect(values[1]).toHaveTextContent('19BBY');
    expect(labels[2]).toHaveTextContent('gender:');
    expect(values[2]).toHaveTextContent('male');
    expect(labels[3]).toHaveTextContent('url:');
    expect(values[3]).toHaveTextContent('http://localhost:8080/api/people/1');
  });

  it('should render close button with correct text and class', () => {
    const { getCloseButton } = renderCardDetails({
      details: mockCharacter,
    });

    const closeButton = getCloseButton();
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveTextContent('×');
    expect(closeButton).toHaveClass(
      'character-details__button',
      'button_square'
    );
  });

  it('should call onClick when close button is clicked', () => {
    const mockOnClick = vi.fn();
    const { getCloseButton } = renderCardDetails({
      details: mockCharacter,
      mockOnClick,
    });

    const closeButton = getCloseButton();
    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render details with correct CSS classes', () => {
    const { getDetailsContainer, getDetailsCard } = renderCardDetails({
      details: mockCharacter,
    });

    const detailsContainer = getDetailsContainer();
    const detailsCard = getDetailsCard();

    expect(detailsContainer).toHaveClass('character-details');
    expect(detailsCard).toHaveClass('character-details__card');
  });

  it('should render each detail with label and value spans', () => {
    const { container } = renderCardDetails({
      details: mockCharacter,
    });

    const detailParagraphs = container.querySelectorAll(
      '.character-details__card p'
    );
    expect(detailParagraphs).toHaveLength(4);

    detailParagraphs.forEach((p) => {
      const label = p.querySelector('.character-details__label');
      const value = p.querySelector('.character-details__value');

      expect(label).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });

  it('should handle empty character object', () => {
    const { getDetailsContainer, getDetailLabels, getDetailValues } =
      renderCardDetails({
        details: {} as Character,
      });

    expect(getDetailsContainer()).toBeInTheDocument();
    expect(getDetailLabels()).toHaveLength(0);
    expect(getDetailValues()).toHaveLength(0);
  });
});
