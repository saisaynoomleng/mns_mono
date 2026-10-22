import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type HandwritingTitleProps = {
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<'span'>, 'className'>;

const HandwritingTitle = ({
  children,
  className,
  ...props
}: HandwritingTitleProps): React.JSX.Element => {
  return (
    <span
      className={twMerge(clsx('font-cursive text-primary', className))}
      {...props}
    >
      {children}
    </span>
  );
};

export default HandwritingTitle;
