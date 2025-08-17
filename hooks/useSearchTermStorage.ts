import { useState, useEffect } from 'react';

const useSearchTermStorage = (key: string) => {
  const [term, setTerm] = useState<string>(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    localStorage.setItem(key, term);
    return () => {
      localStorage.setItem(key, term);
    };
  }, [key, term]);

  return [term, setTerm] as const;
};

export default useSearchTermStorage;
