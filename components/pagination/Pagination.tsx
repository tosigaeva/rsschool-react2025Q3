"use client";

import { usePagination } from "#/hooks/useNavigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const { onClick, currentPage } = usePagination();

  return (
    <div className="flex flex-row justify-center">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onClick(page)}
            className="not-dark:bg-primary-500 not-dark:hover:bg-primary-400 not-dark:hover:border-primary-400 w-10"
            disabled={page === currentPage}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
}
