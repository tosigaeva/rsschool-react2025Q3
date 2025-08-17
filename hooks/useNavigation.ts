import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePagination = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams?.get('page')) || 1;

  const onClick = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams ?? []);
    params.set('page', `${pageNumber}`);

    replace(`${pathname}?${params.toString()}`);
  };

  return {
    currentPage,
    onClick,
  };
};

export const useSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onTermChange = (term: string) => {
    const params = new URLSearchParams(searchParams ?? []);
    params.set('query', term);

    replace(`${pathname}?${params.toString()}`);
  };

  return {
    onTermChange,
  };
};
