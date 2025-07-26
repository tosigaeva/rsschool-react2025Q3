import type { SearchButtonProps } from '../../types';

function SearchButton({ onClick }: SearchButtonProps) {
  return <button onClick={onClick}>Search</button>;
}

export default SearchButton;
