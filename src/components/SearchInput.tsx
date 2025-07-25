import type { SearchInputProps } from '../types';

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search for a character..."
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchInput;
