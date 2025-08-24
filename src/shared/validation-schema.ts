import { z } from 'zod';

import { useCountriesStore } from '@/shared/store';

const allowedCountries = useCountriesStore.getState().countryNames();

export const schema = z
  .object({
    age: z
      .number()
      .min(0, 'Age cannot be negative')
      .max(150, 'Age seems unrealistic'),

    confirmPassword: z.string(),

    country: z
      .string()
      .min(1, 'Please select a country')
      .refine((val) => allowedCountries.includes(val), {
        message: 'Please select a valid country from the list',
      }),

    email: z.email('Invalid email address'),

    gender: z
      .enum(['male', 'female'])
      .refine((val) => val === 'male' || val === 'female', {
        message: 'Please select a valid gender',
      }),

    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z, А-Я]/, 'Name must start with uppercase letter'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /[A-Z, А-Я]/,
        'Password must contain at least one uppercase letter'
      )
      .regex(
        /[a-z, а-я]/,
        'Password must contain at least one lowercase letter'
      )
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),

    picture: z
      .custom<FileList>(
        (files) => files instanceof FileList && files.length > 0,
        {
          message: 'Please upload a picture',
        }
      )
      .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
        message: 'File size must be less than 5MB',
      })
      .refine((files) => ['image/jpeg', 'image/png'].includes(files[0]?.type), {
        message: 'Only JPEG and PNG files are allowed',
      }),

    terms: z.boolean().refine((val) => val === true, 'You must accept terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof schema>;
