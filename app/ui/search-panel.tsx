'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useSearchTermStorage from '../../src/shared/hooks/useSearchTermStorage';

export default function SearchPanel() {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useSearchTermStorage('searchTerm');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setInputValue(searchTerm || '');
  }, [searchTerm]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
  };

  const onClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (inputValue) {
      params.set('query', inputValue);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);

    setSearchTerm(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a character..."
        value={inputValue}
        onChange={onChange}
      />
      <button
        className="bg-primary-500 hover:bg-primary-400 hover:border-primary-400 text-black"
        onClick={onClick}
      >
        Search
      </button>
    </div>
  );
}
