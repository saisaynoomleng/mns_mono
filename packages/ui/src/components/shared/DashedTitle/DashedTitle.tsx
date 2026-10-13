import { clsx, twMerge } from 'cn';
import { BsDash } from 'react-icons/bs';

export const DashedTitle = ({
  className,
  label,
}: {
  className?: string;
  label: string;
}) => {
  return (
    <p
      className={twMerge(
        clsx(
          'flex gap-x-1 md:gap-x-2 items-center text-muted-foreground uppercase tracking-wide text-fs-300 font-medium',
          className,
        ),
      )}
    >
      <span>
        <BsDash />
      </span>
      <span>{label}</span>
    </p>
  );
};
