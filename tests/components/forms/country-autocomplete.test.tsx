import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/shared/store', () => ({
  useCountriesStore: (selector: (mockState: object) => void) => {
    const mockState = {
      countries: [
        { code: 'RU', name: 'Russia' },
        { code: 'US', name: 'USA' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'CA', name: 'Canada' },
      ],
      countryNames: () => ['Russia', 'USA', 'Germany', 'France', 'Canada'],
      setCountries: vi.fn(),
    };
    return selector(mockState);
  },
}));

import { CountryAutocomplete } from '@/components/forms/country-autocomplete';

describe('CountryAutocomplete', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    name: 'country',
    onChange: mockOnChange,
    value: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field with correct attributes', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'country');
    expect(input).toHaveAttribute('id', 'country');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('shows dropdown when input is focused', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(screen.getByText('Russia')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('filters countries based on input value', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Ru' } });

    expect(screen.getByText('Russia')).toBeInTheDocument();
    expect(screen.queryByText('USA')).not.toBeInTheDocument();
    expect(screen.queryByText('Germany')).not.toBeInTheDocument();
    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  it('calls onChange when country is selected', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const russiaOption = screen.getByText('Russia');
    fireEvent.mouseDown(russiaOption);

    expect(mockOnChange).toHaveBeenCalledWith('Russia');
  });

  it('closes dropdown after selection', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const russiaOption = screen.getByText('Russia');
    fireEvent.mouseDown(russiaOption);

    expect(screen.queryByText('USA')).not.toBeInTheDocument();
  });

  it('closes dropdown when input loses focus', async () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(screen.getByText('Russia')).toBeInTheDocument();

    fireEvent.blur(input);

    await waitFor(
      () => {
        expect(screen.queryByText('Russia')).not.toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });

  it('calls onChange when typing in input', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test' } });

    expect(mockOnChange).toHaveBeenCalledWith('Test');
  });

  it('shows all countries when input is empty and focused', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(screen.getByText('Russia')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('handles case-insensitive filtering', () => {
    render(<CountryAutocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'germany' } });

    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.queryByText('Russia')).not.toBeInTheDocument();
  });
});
