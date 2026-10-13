import { Button } from '#components/ui/button';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

type SubmitButtonProps = {
  className?: string;
  label: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export const SubmitButton = ({
  className,
  label,
}: SubmitButtonProps): React.JSX.Element => {
  return (
    <Button
      type="submit"
      className={twMerge(
        clsx('group overflow-hidden text-background! w-fit', className),
      )}
    >
      <span>
        <FaPaperPlane className="translate-x-[-200%] group-hover:translate-x-0 duration-200 transition-transform ease-in group-hover:rotate-45" />
      </span>
      <span>{label}</span>
      <span>
        <FaPaperPlane className="group-hover:translate-x-[200%] translate-x-0 duration-200 transition-transform ease-in group-hover:rotate-45" />
      </span>
    </Button>
  );
};
