import { clsx, twMerge } from 'cn';
import type { ComponentPropsWithoutRef } from 'react';

type Logo = {
  className?: string;
  size?: Size;
  fullText?: boolean;
} & Omit<ComponentPropsWithoutRef<'p'>, 'className'>;

type Size = 'sm' | 'md' | 'lg';

const sizeVariant: Record<Size, string> = {
  sm: 'text-fs-500 md:text-fs-600',
  md: 'text-fs-600 md:text-fs-700',
  lg: 'text-fs-800 md:text-fs-900',
};

export const Logo = ({
  className,
  size = 'md',
  fullText = true,
  ...props
}: Logo) => {
  return fullText ? (
    <p
      className={twMerge(clsx('font-extrabold', sizeVariant[size], className))}
      {...props}
    >
      mns<span className="text-brand-primary-400">.</span>
    </p>
  ) : (
    <p
      className={twMerge(
        clsx(
          'font-extrabold text-brand-primary-400!',
          sizeVariant[size],
          className,
        ),
      )}
      {...props}
    >
      m
    </p>
  );
};
