interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ value, onChange }: Props) {
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
