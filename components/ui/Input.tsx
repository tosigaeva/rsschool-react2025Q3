import type { InputProps } from '#/shared/ui/props/inputProps.ts';

export function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
