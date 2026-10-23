import { Button } from '@mns/ui';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type NavLinkButtonProps = {
  className?: string;
  href: string;
  label: string;
};

const NavLinkButton = ({
  className,
  href,
  label,
}: NavLinkButtonProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'capitalize grid grid-cols-1 grid-rows-1 group overflow-hidden w-fit',
          className,
        ),
      )}
    >
      <span className="col-start-1 row-start-1  translate-y-0 group-hover:translate-y-[200%] transition-transform duration-500 ease-in-out">
        {label}
      </span>
      <span className="col-start-1 row-start-1  translate-y-[-200%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
        {label}
      </span>
    </Link>
  );
};

export default NavLinkButton;
