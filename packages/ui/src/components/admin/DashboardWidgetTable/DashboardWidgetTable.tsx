import { Separator } from '#components/ui/separator';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '#components/ui/table';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';

type DashboardWidgetTableProps = {
  className?: string;
  headers: string[];
  title: React.ReactNode;
  tableBody: React.ReactNode;
  tableFilter?: React.ReactNode;
  paginations?: React.ReactNode;
};

export const DashboardWidgetTable = ({
  className,
  title,
  headers,
  tableBody,
  tableFilter,
  paginations,
}: DashboardWidgetTableProps): React.JSX.Element => {
  return (
    <div className={twMerge(clsx('dashboard-widget', className))}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <p className="widget-title">{title}</p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
          {tableFilter}
        </div>
      </div>

      <Separator />

      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="border-none!">
            {headers.map((header) => (
              <TableHead
                key={header}
                className="capitalize text-secondary px-4 md:px-6"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>{tableBody}</TableBody>
      </Table>

      {/* paginations */}
      {paginations ? paginations : null}
    </div>
  );
};
