import { useState, useEffect } from 'react';

const useSearchTermStorage = (key: string) => {
  const [query, setquery] = useState<string>(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    localStorage.setItem(key, query);
    return () => {
      localStorage.setItem(key, query);
    };
  }, [key, query]);

  return [query, setquery] as const;
};

export default useSearchTermStorage;
