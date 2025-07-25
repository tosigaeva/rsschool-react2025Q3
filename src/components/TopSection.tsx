import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { useEffect, useState } from 'react';
import type { TopSectionProps } from '../types';

function TopSection({ onSearch }: TopSectionProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('searchTerm');
    if (stored) setInputValue(stored);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    const trim = inputValue.trim();
    onSearch(trim);
  };

  return (
    <>
      <SearchInput value={inputValue} onChange={handleInputChange} />
      <SearchButton onClick={handleSearchClick} />
    </>
  );
}

export default TopSection;
