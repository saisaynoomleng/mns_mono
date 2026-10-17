import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Button } from '@mns/ui';
import Link from 'next/link';

type RenderActionProps = {
  className?: string;
  label: string;
  href: string;
  type?: 'text' | 'link';
};

const RenderAction = ({
  className,
  label,
  href,
  type = 'link',
}: RenderActionProps) => {
  return type === 'link' ? (
    <Button variant="link" className={twMerge(clsx('', className))} asChild>
      <Link href={href} className="capitalize">
        {label}
      </Link>
    </Button>
  ) : (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'capitalize hover:underline underline-offset-2 text-primary',
          className,
        ),
      )}
    >
      {label}
    </Link>
  );
};

export default RenderAction;
