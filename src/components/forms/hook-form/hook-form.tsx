import { FormField } from '@/components/forms';
import { Button, Checkbox, Input, Select } from '@/components/ui';

export function HookForm() {
  return (
    <>
      <h2 className="mb-6 text-center font-bold">React Hook Form</h2>
      <form className="flex flex-col gap-4">
        <FormField error="Name is required" id="name" label="Name">
          <Input id="name" type="text" />
        </FormField>

        <FormField id="age" label="Age">
          <Input id="age" type="number" />
        </FormField>

        <FormField id="email" label="Email">
          <Input id="email" type="email" />
        </FormField>

        <FormField id="password" label="Password">
          <Input id="password" type="password" />
        </FormField>

        <FormField id="confirmPassword" label="Confirm password">
          <Input id="confirmPassword" type="password" />
        </FormField>

        <FormField id="gender" label="Gender">
          <Select id="gender">
            <option>Male</option>
            <option>Female</option>
          </Select>
        </FormField>

        <FormField error="You must accept terms" id="tc" label="">
          <div className="flex items-center gap-2">
            <Checkbox id="tc" />
            <label className="text-sm" htmlFor="tc">
              Accept Terms & Conditions
            </label>
          </div>
        </FormField>

        <FormField id="picture" label="Upload Picture">
          <Input accept="image/png, image/jpeg" id="picture" type="file" />
        </FormField>

        <FormField id="country" label="Country">
          <Input id="country" />
        </FormField>

        <Button
          className="mt-6 w-full bg-green-300"
          onClick={() => {}}
          text={'Submit'}
        />
      </form>
    </>
  );
}
