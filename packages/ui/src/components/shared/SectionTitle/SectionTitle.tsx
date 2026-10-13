import { clsx, twMerge } from 'cn';
import type { ComponentPropsWithoutRef } from 'react';
import type React from 'react';

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

type Size = 'sm' | 'md' | 'lg';

type SectionTitleProps<T extends Heading> = {
  className?: string;
  as?: T;
  children: React.ReactNode;
  size?: Size;
} & Omit<ComponentPropsWithoutRef<T>, 'className' | 'as'>;

const sizeVariants: Record<Size, string> = {
  sm: 'text-fs-500 md:text-fs-600',
  md: 'text-fs-600 md:text-fs-700',
  lg: 'text-fs-700 md:text-fs-800',
};

export const SectionTitle = <T extends Heading>({
  as,
  children,
  className,
  size = 'md',
  ...props
}: SectionTitleProps<T>): React.JSX.Element => {
  const Comp = as ?? 'h2';

  return (
    <Comp
      className={twMerge(
        clsx(
          'font-header font-semibold uppercase tracking-wider',
          sizeVariants[size],
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
