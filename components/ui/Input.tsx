import {InputProps} from "#/components/ui/props/inputProps";

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
