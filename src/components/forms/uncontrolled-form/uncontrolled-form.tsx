import { Button, Input } from '@/components/ui';

export function UncontrolledForm() {
  return (
    <>
      <h2 className="mb-6 text-center font-bold">Uncontrolled Form</h2>
      <form className="flex flex-col gap-4">
        <Input
          error={'Name is required'}
          id={'name'}
          label={'Name:'}
          type="text"
        />
        <Input id={'age'} label={'Age'} type="number" />
        <Input id={'email'} label={'Email'} type="email" />
        <Input id={'password'} label={'Password'} type="password" />
        <Input
          id={'confirmPassword'}
          label={'Confirm password'}
          type="password"
        />
        <div className="flex min-h-12 flex-col gap-1">
          <label className="text-sm" htmlFor="gender">
            Gender
          </label>
          <select
            className="rounded-lg border border-gray-100 p-1 text-sm"
            id="gender"
            name="gender"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          <span className="min-h-4 text-xs text-red-600"></span>
        </div>
        <div className="flex min-h-12 flex-col gap-1">
          <label className="text-sm">
            <input className="p-1 text-sm" name="tc" type="checkbox" />
            Accept Terms & Conditions
          </label>
          <span className="min-h-4 text-xs text-red-600">
            You must accept terms
          </span>
        </div>
        <Input
          accept="image/png, image/jpeg"
          id={'picture'}
          label={'Upload Picture'}
          type="file"
        />
        <Input id={'country'} label={'Country'} />
        <Button
          className="mt-6 w-full bg-pink-400"
          onClick={() => {}}
          text={'Submit'}
        />
      </form>
    </>
  );
}
