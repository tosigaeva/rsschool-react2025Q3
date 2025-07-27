import useSearchTermStorage from '#/shared/hooks/useSearchTermStorage.ts';
import { Button, Input } from '#/shared/ui';
import type { SearchPanelSectionProps } from '#/types';
import { useSearchParams } from 'react-router';

export function SearchPanelSection({ onSearch }: SearchPanelSectionProps) {
  const [searchTerm, setSearchTerm] = useSearchTermStorage('searchTerm');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  const handleSearchClick = async () => {
    setSearchTerm(searchTerm);
    setSearchParams({ page: '1' });
    onSearch(searchTerm, 1);
    setSearchParams(searchParams);
  };

  return (
    <>
      <Input value={searchTerm} onChange={handleInputChange} />
      <Button onClick={handleSearchClick} />
    </>
  );
}
