import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { HookForm } from '@/components/forms/hook-form/hook-form';

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

const mockAddEntry = vi.fn();
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

describe('HookForm', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockAddEntry.mockClear();
  });

  it('renders all required form fields', () => {
    render(<HookForm onClose={mockOnClose} />);

    expect(screen.getByLabelText(/name/i)).toBeDefined();
    expect(screen.getByLabelText(/age/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/^password$/i)).toBeDefined();
    expect(screen.getByLabelText(/confirm password/i)).toBeDefined();
    expect(screen.getByLabelText(/gender/i)).toBeDefined();
    expect(screen.getByLabelText(/upload picture/i)).toBeDefined();
    expect(screen.getByLabelText(/country/i)).toBeDefined();
    expect(screen.getByLabelText(/accept terms & conditions/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDefined();
  });

  it('shows submit button is disabled initially', () => {
    render(<HookForm onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('allows filling form fields', () => {
    render(<HookForm onClose={mockOnClose} />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const ageInput = screen.getByLabelText(/age/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput.value).toBe('John');
    expect(ageInput.value).toBe('25');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('handles file upload', () => {
    render(<HookForm onClose={mockOnClose} />);

    const fileInput = screen.getByLabelText(
      /upload picture/i
    ) as HTMLInputElement;
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files?.[0]).toEqual(file);
  });

  it('handles checkbox selection', () => {
    render(<HookForm onClose={mockOnClose} />);

    const termsCheckbox = screen.getByLabelText(
      /accept terms & conditions/i
    ) as HTMLInputElement;

    fireEvent.click(termsCheckbox);

    expect(termsCheckbox.checked).toBe(true);
  });
});
