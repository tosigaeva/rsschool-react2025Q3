import type { InputProps } from '#/shared/ui/props/inputProps.ts';

export function Input({ value, onChange }: InputProps) {
  return (
    <input
      type="text"
      placeholder="Search for a character..."
      value={value}
      onChange={onChange}
    />
  );
}
