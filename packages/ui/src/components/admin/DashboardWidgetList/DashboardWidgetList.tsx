import { ScrollArea, ScrollBar } from '#components/ui/scroll-area';
import { Separator } from '#components/ui/separator';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';

type DashboardWidgetListProps = {
  className?: string;
  listItems: React.ReactNode;
  title: React.ReactNode;
  footer?: string;
};

export const DashboardWidgetList = ({
  className,
  listItems,
  title,
  footer,
}: DashboardWidgetListProps): React.JSX.Element => {
  return (
    <div className={twMerge(clsx('dashboard-widget', className))}>
      <p className="widget-title">{title}</p>

      <Separator />

      <ScrollArea className="h-75 px-4 md:px-6">
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
