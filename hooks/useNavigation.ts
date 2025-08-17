'use client';

import useSearchTermStorage from '#/hooks/useSearchTermStorage';
import { createNavigation } from 'next-intl/navigation';
import { useSearchParams } from 'next/navigation';
const { useRouter, usePathname } = createNavigation();

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
  const [, setQuery] = useSearchTermStorage('query');
  const { replace } = useRouter();
  const pathname = usePathname();

  const onTermChange = (term: string) => {
    const params = new URLSearchParams(searchParams ?? []);
    params.set('query', term);
    setQuery(term);

    replace(`${pathname}?${params.toString()}`);
  };

  return {
    onTermChange,
  };
};

export const useNavigation = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const goToSearchPage = () => {
    const params = new URLSearchParams(searchParams ?? []);
    replace(`/?${params.toString()}`);
  };

  const goToDetailPage = (id: string) => {
    replace(generateDetailsLink(id));
  };

  const generateDetailsLink = (id: string) => {
    const params = new URLSearchParams(searchParams ?? []);
    return `/details/${id}?${params.toString()}`;
  };

  const refreshLocale = (url: string) => {
    window.location.href = url;
  };

  return {
    goToSearchPage,
    goToDetailPage,
    generateDetailsLink,
    refreshLocale,
  };
};
