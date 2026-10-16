import { CONTACT_STATUS_COLOR } from '@/lib/utils';
import { ListContactByIdOutputType } from '@mns/api/types';
import { Button } from '@mns/ui';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { TRPCMutationType } from '@mns/api/types';

type Status = Exclude<
  NonNullable<ListContactByIdOutputType>['status'],
  'in_progress'
>;

type MutateContactStatusProps = {
  className?: string;
  action: (status: Status) => Promise<TRPCMutationType>;
};

export const MutateContactStatus = ({
  className,
  action,
}: MutateContactStatusProps): React.JSX.Element => {
  return (
    <div className={twMerge(clsx('flex gap-x-2 items-center', className))}>
      <Button
        className="flex-1 text-background"
        style={{ backgroundColor: CONTACT_STATUS_COLOR['new'] }}
        onClick={() => action('new')}
      >
        Mark Unread
      </Button>
      <Button
        className="flex-1 text-background"
        style={{ backgroundColor: CONTACT_STATUS_COLOR['resolved'] }}
        onClick={() => action('resolved')}
      >
        Mark Resolved
      </Button>
      <Button
        className="flex-1 text-background"
        style={{ backgroundColor: CONTACT_STATUS_COLOR['spam'] }}
        onClick={() => action('spam')}
      >
        Mark Spam
      </Button>
    </div>
  );
};
