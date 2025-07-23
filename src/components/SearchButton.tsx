interface Props {
  onClick: () => void;
}

function SearchButton({ onClick }: Props) {
  return <button onClick={onClick}>Search</button>;
}

export default SearchButton;
