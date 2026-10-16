import { CONTACT_STATUS_COLOR } from '@/lib/utils';
import { ListContactByIdOutputType } from '@mns/api/types';
import { replaceUnderscore, toTitleCase } from '@mns/utils';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContactStatusProps = {
  className?: string;
  status: Status;
};

type Status = NonNullable<ListContactByIdOutputType['status']>;

export const ContactStatusBadge = ({
  className,
  status,
}: ContactStatusProps): React.JSX.Element => {
  return (
    <div
      style={{
        color: CONTACT_STATUS_COLOR[status],
        borderColor: CONTACT_STATUS_COLOR[status],
      }}
      className={twMerge(
        clsx('p-1 border-2 w-fit rounded-lg font-semibold', className),
      )}
    >
      {toTitleCase(replaceUnderscore(status))}
    </div>
  );
};
