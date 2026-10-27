'use client';

import { Button } from '@mns/ui';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

type BackToProps = {
  className?: string;
  label: string;
  href: string;
};

export const BackTo = ({
  className,
  label,
  href,
}: BackToProps): React.JSX.Element => {
  return (
    <Button asChild variant="link">
      <Link
        href={href}
        className={twMerge(clsx('text-fs-400 group', className))}
      >
        <span className="group-hover:-translate-x-2 transition-transform duration-200">
          <IoArrowBackCircleSharp />
        </span>
        <span>Back to</span>
        <span className="capitalize">{label}</span>
      </Link>
    </Button>
  );
};
