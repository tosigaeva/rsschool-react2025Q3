import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

const mockAddEntry = vi.hoisted(() => vi.fn());

vi.mock('@/shared/validation-schema', () => ({
  schema: z.object({
    age: z.number(),
    confirmPassword: z.string(),
    country: z.string(),
    email: z.string(),
    gender: z.enum(['male', 'female']),
    name: z.string(),
    password: z.string(),
    picture: z.any(),
    terms: z.boolean(),
  }),
}));

vi.mock('@/shared/utils', () => ({
  fileToBase64: vi.fn().mockResolvedValue('mocked-base64-string'),
}));

vi.mock('@/shared/store', () => ({
  useCountriesStore: () => ({
    countries: [
      { code: 'RU', name: 'Russia' },
      { code: 'US', name: 'USA' },
      { code: 'DE', name: 'Germany' },
      { code: 'FR', name: 'France' },
      { code: 'CA', name: 'Canada' },
    ],
    countryNames: () => ['Russia', 'USA', 'Germany', 'France', 'Canada'],
    getState: () => ({
      countries: [
        { code: 'RU', name: 'Russia' },
        { code: 'US', name: 'USA' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'CA', name: 'Canada' },
      ],
      countryNames: () => ['Russia', 'USA', 'Germany', 'France', 'Canada'],
    }),
    setCountries: vi.fn(),
  }),
  useFormStore: () => ({
    addEntry: mockAddEntry,
    entries: [],
    markAllAsSeen: vi.fn(),
    markAsSeen: vi.fn(),
    nextId: 1,
  }),
}));

import { UncontrolledForm } from '@/components/forms';

describe('UncontrolledForm', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockAddEntry.mockClear();
  });

  it('renders all required form fields', () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    expect(screen.getByLabelText(/name/i)).toBeDefined();
    expect(screen.getByLabelText(/age/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/^password$/i)).toBeDefined();
    expect(screen.getByLabelText(/confirm password/i)).toBeDefined();
    expect(screen.getByLabelText(/gender/i)).toBeDefined();
    expect(screen.getByLabelText(/upload picture/i)).toBeDefined();
    expect(screen.getByText(/country/i)).toBeDefined();
    expect(screen.getByLabelText(/accept terms & conditions/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDefined();
  });

  it('displays validation errors for invalid data', async () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/invalid input: expected number, received undefined/i)
      ).toBeDefined();
      expect(
        screen.getByText(/invalid option: expected one of "male"\|"female"/i)
      ).toBeDefined();
    });
  });

  it('validates password strength requirements', async () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'weak' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'weak' },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: 'male' },
    });
    fireEvent.click(screen.getByLabelText(/accept terms & conditions/i));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
  });
});
