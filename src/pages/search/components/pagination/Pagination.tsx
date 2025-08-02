import '#/App.css';
import type { PaginationProps } from '#/types/props';

export function Pagination({
  totalPages,
  currentPage,
  onClick,
}: PaginationProps) {
  return (
    <div className="flex flex-row justify-center">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onClick(page)}
            className="w-10"
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
