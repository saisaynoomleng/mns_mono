import { AppCard } from '@/components/AppCard';
import { ALL_APPS_QUERY_RESULT } from '@/sanity/types';
import { SectionTitle } from '@mns/ui';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type AppRowType = {
  className?: string;
  apps: NonNullable<ALL_APPS_QUERY_RESULT>;
  title: string;
};

export const AppRow = ({
  apps,
  className,
  title,
}: AppRowType): React.JSX.Element => {
  return (
    <div className={twMerge(clsx('space-y-2 md:space-y-4', className))}>
      <SectionTitle as="h2" size="sm" className="capitalize">
        {title}
      </SectionTitle>

      <div className="flex gap-x-4 items-center flex-wrap">
        {apps.map((app) => (
          <AppCard usedFor="user" key={app._id} appData={app} />
        ))}
      </div>
    </div>
  );
};
