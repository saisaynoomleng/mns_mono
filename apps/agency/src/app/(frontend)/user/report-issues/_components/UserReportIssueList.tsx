'use client';

import { useTRPC } from '@/components/QueryProvider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@mns/ui';
import { formatDateUS, toTitleCase } from '@mns/utils';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { TbLayoutBottombarCollapseFilled } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

export const UserReportIssueList = ({ className }: { className?: string }) => {
  const trpc = useTRPC();

  const {
    data: apps,
    isPending,
    isError,
  } = useQuery(trpc.reportIssues.listByUser.queryOptions());

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Cannot get the issues list</div>;
  }

  if (apps.data?.length === 0) {
    return <div>No logs to display yet.</div>;
  }

  return (
    <div
      className={twMerge(clsx('flex flex-col gap-y-2 md:gap-y-4', className))}
    >
      {apps.data?.map((data) => (
        <Collapsible
          key={data.appId}
          className="hover:bg-primary/20 shadow p-2 "
        >
          <CollapsibleTrigger className="flex justify-between items-center min-w-full">
            <p className="flex gap-x-2">
              <span className="font-semibold">
                {toTitleCase(data.app?.name as string)}
              </span>
              {data.status && (
                <span className="p-1 rounded-lg border border-input text-fs-300">
                  {data.status}
                </span>
              )}
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
