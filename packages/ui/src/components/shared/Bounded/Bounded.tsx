import { twMerge } from 'cn';
import type { ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import clsx from 'clsx';

type BoundedProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
  padding?: Padding;
  size?: Size;
  spacing?: Spacing;
  isCentered?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'className'>;

type Padding = 'none' | 'sm' | 'md' | 'lg';
type Size = 'sm' | 'md' | 'full';
type Spacing = 'none' | 'sm' | 'md' | 'lg';

const paddingVariants: Record<Padding, string> = {
  none: '',
  sm: 'px-4 md:px-6 lg:px-8',
  md: 'px-6 md:px-8 lg:px-10',
  lg: 'px-8 md:px-10 lg:px-12',
};

const sizeVariants: Record<Size, string> = {
  sm: 'max-w-4xl',
  md: 'max-w-7xl',
  full: 'max-w-none',
};

const spacingVariants: Record<Spacing, string> = {
  none: '',
  sm: 'space-y-4 md:space-y-6 lg:space-y-8',
  md: 'space-y-6 md:space-y-8 lg:space-y-10',
  lg: 'space-y-8 md:space-y-10 lg:space-y-12',
};

export const Bounded = <T extends React.ElementType>({
  as,
  className,
  children,
  padding = 'sm',
  spacing = 'none',
  size = 'full',
  isCentered = false,
  ...props
}: BoundedProps<T>): React.JSX.Element => {
  const Comp = as ?? 'section';

  return (
    <Comp
      className={twMerge(
        clsx(
          'py-4 md:py-6',
          paddingVariants[padding],
          spacingVariants[spacing],
          sizeVariants[size],
          isCentered && 'mx-auto',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
