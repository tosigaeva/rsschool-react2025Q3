import type { SearchPanelSectionProps } from '#/types';

import useSearchTermStorage from '#/shared/hooks/useSearchTermStorage.ts';
import { Button, Input } from '#/shared/ui';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function SearchPanelSection({ onSearch }: SearchPanelSectionProps) {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useSearchTermStorage('searchTerm');
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setInput(searchTerm || '');
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.trim());
  };

  const handleSearchClick = async () => {
    setSearchTerm(input);
    setSearchParams({ page: '1' });
    onSearch(input);
  };

  return (
    <>
      <Input value={input} onChange={handleInputChange} />
      <Button onClick={handleSearchClick} />
    </>
  );
}
