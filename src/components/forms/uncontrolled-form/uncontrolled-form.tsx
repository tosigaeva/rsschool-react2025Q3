import { useState } from 'react';

import { FormField } from '@/components/forms';
import { Button, Checkbox, Input, Select } from '@/components/ui';
import { useFormStore } from '@/shared/store';
import { type FormData, schema } from '@/shared/validation-schema';

type FormErrors = {
  [K in keyof FormData]?: string;
};

type Props = {
  onClose: () => void;
};

export function UncontrolledForm({ onClose }: Props) {
  const addEntry = useFormStore((state) => state.addEntry);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data: Partial<FormData> = {
      age: formData.get('age') ? Number(formData.get('age')) : undefined,
      confirmPassword: (formData.get('confirmPassword') as string) ?? undefined,
      country: (formData.get('country') as string) ?? undefined,
      email: (formData.get('email') as string) ?? undefined,
      gender: (formData.get('gender') as 'female' | 'male') ?? undefined,
      name: (formData.get('name') as string) ?? undefined,
      password: (formData.get('password') as string) ?? undefined,
      picture:
        (form.elements.namedItem('picture') as HTMLInputElement).files ??
        undefined,
      terms: formData.get('terms') === 'on',
    };

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const formErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        formErrors[field] = issue.message;
      });
      setErrors(formErrors);
      return;
    }
    addEntry({ data: parsed.data, formType: 'uncontrolled' });
    onClose();
  };

  return (
    <>
      <h2 className="mb-6 text-center font-bold">Uncontrolled Form</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField error={errors.name} id="name" label="Name">
          <Input id="name" name="name" type="text" />
        </FormField>

        <FormField error={errors.age} id="age" label="Age">
          <Input id="age" name="age" type="number" />
        </FormField>

        <FormField error={errors.email} id="email" label="Email">
          <Input id="email" name="email" type="email" />
        </FormField>

        <FormField error={errors.password} id="password" label="Password">
          <Input id="password" name="password" type="password" />
        </FormField>

        <FormField
          error={errors.confirmPassword}
          id="confirmPassword"
          label="Confirm password"
        >
          <Input id="confirmPassword" name="confirmPassword" type="password" />
        </FormField>

        <FormField error={errors.gender} id="gender" label="Gender">
          <Select id="gender" name="gender">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </FormField>

        <FormField error={errors.terms} id="terms" label="">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" name="terms" />
            <label className="text-sm" htmlFor="terms">
              Accept Terms & Conditions
            </label>
          </div>
        </FormField>

        <FormField error={errors.picture} id="picture" label="Upload Picture">
          <Input
            accept="image/png, image/jpeg"
            id="picture"
            name="picture"
            type="file"
          />
        </FormField>

        <FormField error={errors.country} id="country" label="Country">
          <Input id="country" name="country" />
        </FormField>

        <Button
          className="mt-6 w-full bg-pink-400"
          text={'Submit'}
          type="submit"
        />
      </form>
    </>
  );
}
