import { Button } from '@mns/ui';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type RenderActionProps = {
  className?: string;
  label: string;
  href: string;
};

export const RenderAction = ({ className, label, href }: RenderActionProps) => {
  return (
    <Button variant="link" asChild className={twMerge(clsx('', className))}>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
