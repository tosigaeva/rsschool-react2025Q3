import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CountryAutocomplete, FormField } from '@/components/forms';
import { Button, Checkbox, Input, Select } from '@/components/ui';
import { useFormStore } from '@/shared/store';
import { type FormData, schema } from '@/shared/validation-schema';

type Props = {
  onClose: () => void;
};
export function HookForm({ onClose }: Props) {
  const addEntry = useFormStore((state) => state.addEntry);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    addEntry({ data, formType: 'hook' });
    onClose();
  };
  return (
    <>
      <h2 className="mb-6 text-center font-bold">React Hook Form</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitData)}>
        <FormField error={errors.name?.message} id="name" label="Name">
          <Input id="name" type="text" {...register('name')} />
        </FormField>

        <FormField error={errors.age?.message} id="age" label="Age">
          <Input
            id="age"
            type="number"
            {...register('age', { valueAsNumber: true })}
          />
        </FormField>

        <FormField error={errors.email?.message} id="email" label="Email">
          <Input id="email" type="email" {...register('email')} />
        </FormField>

        <FormField
          error={errors.password?.message}
          id="password"
          label="Password"
        >
          <Input id="password" type="password" {...register('password')} />
        </FormField>

        <FormField
          error={errors.confirmPassword?.message}
          id="confirmPassword"
          label="Confirm password"
        >
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
        </FormField>

        <FormField error={errors.gender?.message} id="gender" label="Gender">
          <Select id="gender" {...register('gender')}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </FormField>

        <FormField error={errors.terms?.message} id="terms" label="">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" {...register('terms')} />
            <label className="text-sm" htmlFor="terms">
              Accept Terms & Conditions
            </label>
          </div>
        </FormField>

        <FormField
          error={errors.picture?.message}
          id="picture"
          label="Upload Picture"
        >
          <Input
            accept="image/png, image/jpeg"
            id="picture"
            type="file"
            {...register('picture')}
          />
        </FormField>

        <FormField error={errors.country?.message} id="country" label="Country">
          <CountryAutocomplete
            name="country"
            onChange={(val) =>
              setValue('country', val, { shouldValidate: true })
            }
            value={watch('country')}
          />
        </FormField>

        <Button
          className="mt-6 w-full bg-green-300 disabled:cursor-default disabled:opacity-30"
          disabled={!isValid}
          text="Submit"
          type="submit"
        />
      </form>
    </>
  );
}
