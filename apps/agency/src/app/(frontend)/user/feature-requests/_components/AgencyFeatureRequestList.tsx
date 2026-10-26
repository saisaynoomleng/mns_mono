'use client';

import { useTRPC } from '@/components/QueryProvider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@mns/ui';
import { formatDateUS, toTitleCase } from '@mns/utils';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { TbLayoutBottombarCollapseFilled } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

export const AgencyFeatureRequestList = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => {
  const trpc = useTRPC();

  const {
    data: requests,
    isPending,
    isError,
  } = useQuery(trpc.featureRequests.listByUser.queryOptions());

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>Cannot load the feature requests list right now</div>;
  }

  if (requests.data.length === 0) {
    return <div>No list to preview yet</div>;
  }

  return (
    <div className={twMerge(clsx('flex flex-col gap-y-4', className))}>
      {requests.data.map((data) => (
        <Collapsible key={data.id} className="hover:bg-primary/20 p-2 ">
          <CollapsibleTrigger className="flex justify-between items-center min-w-full cursor-pointer">
            <p className="flex gap-x-2 items-center">
              <span className="font-semibold">
                {toTitleCase(data?.app?.name as string)}
              </span>
              <span className="p-1 border border-input rounded-lg text-fs-300">
                {data?.status}
              </span>
            </p>

            {data.createdAt && (
              <p className="text-fs-300">{formatDateUS(data.createdAt)}</p>
            )}

            <TbLayoutBottombarCollapseFilled />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <p className="prose min-w-full">{data.body}</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
