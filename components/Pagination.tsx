'use client';

import { Link } from 'next-view-transitions';
import { usePathname, useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { generatePagination } from '@/utils';

export const PaginationControls = ({ totalPages }: {totalPages: number}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const allPageNumbers = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="inline-flex items-center z-10">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        <div className="flex -space-x-px">
          {allPageNumbers.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPageNumbers.length - 1) position = 'last';
            if (allPageNumbers.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={index}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

  function PaginationNumber({
    page,
    href,
    isActive,
    position,
  }: {
    page: number | string;
    href: string;
    isActive: boolean;
    position?: 'first' | 'last' | 'middle' | 'single';
  }) {
    const className = clsx(
      'flex h-7 w-7 xsm:h-10 xsm:w-10 items-center justify-center border text-sm xsm:text-lg',
      {
        'rounded-l-md': position === 'first' || position === 'single',
        'rounded-r-md': position === 'last' || position === 'single',
        'bg-secondary-orange border-secondary-orange': isActive,
        'hover:bg-gray-700': !isActive && position !== 'middle',
        'text-gray-300': position === 'middle',
      },
    );

    return isActive || position === 'middle' ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  }

  function PaginationArrow({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
  }) {
    const className = clsx(
      'flex h-5 w-5 xsm:h-8 xsm:w-8 items-center justify-center rounded-full border',
      {
        'pointer-events-none text-gray-300': isDisabled,
        'hover:bg-gray-700': !isDisabled,
        'mr-2 md:mr-4': direction === 'left',
        'ml-2 md:ml-4': direction === 'right',
      },
    );

    const icon =
      direction === 'left' ? (
        <ArrowLeftIcon className="w-4" />
      ) : (
        <ArrowRightIcon className="w-4" />
      );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link className={className} href={href}>
        {icon}
      </Link>
    );
  }
