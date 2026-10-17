import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Button } from '@mns/ui';
import Link from 'next/link';

type RenderActionProps = {
  className?: string;
  label: string;
  href: string;
};

const RenderAction = ({ className, label, href }: RenderActionProps) => {
  return (
    <Button variant="link" className={twMerge(clsx('', className))} asChild>
      <Link href={href} className="capitalize">
        {label}
      </Link>
    </Button>
  );
};

export default RenderAction;
