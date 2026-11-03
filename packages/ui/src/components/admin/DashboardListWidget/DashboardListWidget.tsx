import { ScrollArea, ScrollBar } from '#components/ui/scroll-area';
import { Separator } from '#components/ui/separator';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';

type DashboardListWidgetProps = {
  className?: string;
  listItems: React.ReactNode;
  title: string;
  footer?: string;
};

export const DashboardListWidget = ({
  className,
  listItems,
  title,
  footer,
}: DashboardListWidgetProps): React.JSX.Element => {
  return (
    <div
      className={twMerge(
        clsx(
          'max-md:min-w-full md:min-w-100 flex flex-col gap-y-4 md:gap-y-6 shadow-md rounded-lg py-4',
          className,
        ),
      )}
    >
      <p className="font-semibold text-left px-2">{title}</p>

      <Separator />

      <ScrollArea className="h-50 px-4 md:px-6">
        {listItems}
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {footer && (
        <div>
          <Separator />
          <p className="text-center py-2">{footer}</p>
        </div>
      )}
    </div>
  );
};
