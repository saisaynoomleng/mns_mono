import { Button } from '@mns/ui';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type PaginationProps = {
  className?: string;
  totalPages: number;
  currentPage: number;
  pathname: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  filter?: string;
};

export const Pagination = ({
  className,
  totalPages,
  currentPage,
  pathname,
  search,
  sortBy,
  sortOrder,
  filter,
}: PaginationProps): React.JSX.Element => {
  return (
    <div
      className={twMerge(
        clsx('flex gap-x-2 justify-center items-center', className),
      )}
    >
      {Array.from({ length: totalPages })
        .map((_, i) => i + 1)
        .map((page) => (
          <Button
            key={page}
            className={clsx(
              page === currentPage ? 'bg-primary' : 'bg-primary/70',
            )}
          >
            <Link
              href={{
                pathname,
                query: {
                  ...(search && { search }),
                  ...(sortBy && { sortBy }),
                  ...(sortOrder && { sortOrder }),
                  ...(filter && { filter }),
                  page,
                },
              }}
            >
              {page}
            </Link>
          </Button>
        ))}
    </div>
  );
};
