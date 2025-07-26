import SearchInput from './Search/SearchInput';
import SearchButton from './Search/SearchButton';
import type { TopSectionProps } from '../types';
import useSearchStorage from '../hooks/useSearchStorage.ts';

function TopSection({ onSearch }: TopSectionProps) {
  const [searchTerm, setSearchTerm] = useSearchStorage('searchTerm');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const trim = searchTerm.trim();
    onSearch(trim);
  };

  return (
    <>
      <SearchInput value={searchTerm} onChange={handleInputChange} />
      <SearchButton onClick={handleSearchClick} />
    </>
  );
}

export default TopSection;
