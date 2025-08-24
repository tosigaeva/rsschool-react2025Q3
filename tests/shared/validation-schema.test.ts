import { describe, expect, it } from 'vitest';
import { vi } from 'vitest';

vi.mock('@/shared/store', () => ({
  useCountriesStore: {
    getState: () => ({
      countryNames: () => ['Russia', 'USA', 'Germany', 'France', 'Canada'],
    }),
  },
}));

class MockFileList extends FileList {
  constructor() {
    super();
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    Object.defineProperty(this, '0', { value: mockFile, writable: false });
    Object.defineProperty(this, 'length', { value: 1, writable: false });
  }
}

// Now import the schema after mocking
import type { FormData } from '@/shared/validation-schema';

import { schema } from '@/shared/validation-schema';

describe('Validation Schema', () => {
  const createValidFormData = (
    overrides: Partial<FormData> = {}
  ): FormData => ({
    age: 25,
    confirmPassword: 'Password123!',
    country: 'Russia',
    email: 'john@example.com',
    gender: 'male',
    name: 'John',
    password: 'Password123!',
    picture: new MockFileList(),
    terms: true,
    ...overrides,
  });

  describe('Name validation', () => {
    it('validates name starts with uppercase letter', () => {
      const validData = createValidFormData({ name: 'John' });
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('rejects name starting with lowercase letter', () => {
      const invalidData = createValidFormData({ name: 'john' });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Name must start with uppercase letter'
        );
      }
    });

    it('rejects empty name', () => {
      const invalidData = createValidFormData({ name: '' });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name is required');
      }
    });
  });

  describe('Age validation', () => {
    it('validates age within valid range', () => {
      const validData = createValidFormData({ age: 25 });
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('rejects negative age', () => {
      const invalidData = createValidFormData({ age: -5 });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Age cannot be negative');
      }
    });

    it('rejects unrealistic age', () => {
      const invalidData = createValidFormData({ age: 200 });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Age seems unrealistic');
      }
    });
  });

  describe('Email validation', () => {
    it('validates valid email format', () => {
      const validData = createValidFormData({ email: 'john@example.com' });
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('rejects invalid email format', () => {
      const invalidData = createValidFormData({ email: 'invalid-email' });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });
  });

  describe('Password validation', () => {
    it('validates strong password', () => {
      const validData = createValidFormData({
        confirmPassword: 'Password123!',
        password: 'Password123!',
      });
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('rejects password shorter than 8 characters', () => {
      const invalidData = createValidFormData({
        confirmPassword: 'Pass1!',
        password: 'Pass1!',
      });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must be at least 8 characters'
        );
      }
    });

    it('rejects password without uppercase letter', () => {
      const invalidData = createValidFormData({
        confirmPassword: 'password123!',
        password: 'password123!',
      });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must contain at least one uppercase letter'
        );
      }
    });

    it('rejects password without lowercase letter', () => {
      const invalidData = createValidFormData({
        confirmPassword: 'PASSWORD123!',
        password: 'PASSWORD123!',
      });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must contain at least one lowercase letter'
        );
      }
    });

    it('rejects password without number', () => {
      const invalidData = createValidFormData({
        confirmPassword: 'Password!',
        password: 'Password!',
      });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must contain at least one number'
        );
      }
    });

    it('rejects password without special character', () => {
      const invalidData = createValidFormData({
        confirmPassword: 'Password123',
        password: 'Password123',
      });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must contain at least one special character'
        );
      }
    });
  });

  describe('Password confirmation validation', () => {
    it('rejects when passwords do not match', () => {
      const invalidData = createValidFormData({
        confirmPassword: 'DifferentPassword123!',
        password: 'Password123!',
      });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Passwords don't match");
        expect(result.error.issues[0].path).toEqual(['confirmPassword']);
      }
    });
  });

  describe('Gender validation', () => {
    it('validates valid gender values', () => {
      const validMaleData = createValidFormData({ gender: 'male' });
      const validFemaleData = createValidFormData({ gender: 'female' });

      expect(schema.safeParse(validMaleData).success).toBe(true);
      expect(schema.safeParse(validFemaleData).success).toBe(true);
    });

    it('rejects invalid gender values', () => {
      const invalidData = createValidFormData({ gender: undefined });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Invalid option: expected one of "male"|"female"'
        );
      }
    });
  });

  describe('Terms validation', () => {
    it('rejects when terms are not accepted', () => {
      const invalidData = createValidFormData({ terms: false });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('You must accept terms');
      }
    });
  });

  describe('Country validation', () => {
    it('validates valid country from allowed list', () => {
      const validData = createValidFormData({ country: 'Russia' });
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('rejects country not in allowed list', () => {
      const invalidData = createValidFormData({ country: 'InvalidCountry' });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Please select a valid country from the list'
        );
      }
    });

    it('rejects empty country', () => {
      const invalidData = createValidFormData({ country: '' });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select a country');
      }
    });
  });

  describe('Picture validation', () => {
    it('rejects when no picture is uploaded', () => {
      const invalidData = createValidFormData({ picture: undefined });
      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please upload a picture');
      }
    });

    it('validates file type restrictions', () => {
      // This test would require more complex FileList mocking
      // For now, we'll test the basic structure
      const validData = createValidFormData();
      const result = schema.safeParse(validData);

      // The test will pass if FileList is properly mocked
      expect(result.success).toBe(true);
    });
  });

  describe('Complete form validation', () => {
    it('validates complete valid form data', () => {
      const validData = createValidFormData();
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John');
        expect(result.data.age).toBe(25);
        expect(result.data.email).toBe('john@example.com');
        expect(result.data.password).toBe('Password123!');
        expect(result.data.confirmPassword).toBe('Password123!');
        expect(result.data.gender).toBe('male');
        expect(result.data.terms).toBe(true);
        expect(result.data.country).toBe('Russia');
      }
    });

    it('returns all validation errors for invalid form', () => {
      const invalidData = createValidFormData({
        age: -5,
        confirmPassword: 'different',
        country: '',
        email: 'invalid-email',
        gender: undefined,
        name: '',
        password: 'weak',
        terms: false,
      });

      const result = schema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        expect(errorMessages).toContain('Name is required');
        expect(errorMessages).toContain('Age cannot be negative');
        expect(errorMessages).toContain('Invalid email address');
        expect(errorMessages).toContain(
          'Password must be at least 8 characters'
        );
        expect(errorMessages).toContain('You must accept terms');
        expect(errorMessages).toContain('Please select a country');
      }
    });
  });
});
