'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DashboardWidgetList,
  DashboardWidgetTable,
  TableCell,
  TableRow,
} from '@mns/ui';
import { colors } from '@mns/ui/colors';
import {
  formatDateUS,
  formatPriceInCentsToUSD,
  replaceUnderscore,
  toTitleCase,
} from '@mns/utils';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ServiceTableProps = {
  className?: string;
  services: Service[];
};

type Service = {
  name: string;
  sanityId: string;
  status: Status;
  createdAt: Date | string;
  subscriptions: Subscriptions[];
};

type Subscriptions = {
  name: string;
  id: string;
  status: Status;
  pricePerMonthInCent: number;
  createdAt: Date;
};

type Status = 'active' | 'no_longer_available';

const ServiceStatus: Record<Status, string> = {
  active: colors.success[600],
  no_longer_available: colors.error[400],
};

export const ServiceTable = ({
  className,
  services,
}: ServiceTableProps): React.JSX.Element => {
  const [currentService, setCurrentService] = useState<string>(
    services[0].sanityId,
  );

  const selectedService = services.filter(
    (s) => s.sanityId === currentService,
  )[0];

  return (
    <div
      className={twMerge(
        clsx(
          'grid md:grid-cols-[max-content_1fr] gap-y-4 md:gap-x-6',
          className,
        ),
      )}
    >
      <DashboardWidgetList
        title="All services"
        listItems={
          <div className="flex flex-col gap-y-4">
            {services.map((s) => (
              <div
                key={s.sanityId}
                className={clsx(
                  'border-2 border-dotted p-2 border-input rounded-lg hover:border-primary/50',
                  s.sanityId === currentService && 'border-primary',
                )}
                onClick={() => setCurrentService(s.sanityId)}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={clsx(
                      'font-semibold',
                      s.sanityId === currentService &&
                        'border-primary text-primary',
                    )}
                  >
                    {toTitleCase(s.name)}
                  </p>
                  <p
                    style={{ color: ServiceStatus[s.status] }}
                    className="rounded-lg p-2 text-fs-300"
                  >
                    {toTitleCase(replaceUnderscore(s.status))}
                  </p>
                </div>
                <p className="text-fs-300">
                  Created On: <span>{formatDateUS(s.createdAt)}</span>
                </p>
              </div>
            ))}
          </div>
        }
      />

      <DashboardWidgetTable
        headers={['name', 'price per month', 'status', 'created on']}
        title={
          <React.Fragment>
            Available Subscription Plans for{' '}
            <span className="text-primary">{selectedService.name}</span>{' '}
          </React.Fragment>
        }
        tableBody={selectedService.subscriptions.map((sub) => (
          <TableRow key={sub.id}>
            <TableCell className="px-4 md:px-6">{sub.name}</TableCell>
            <TableCell className="px-4 md:px-6">
              {formatPriceInCentsToUSD(sub.pricePerMonthInCent)}
            </TableCell>
            <TableCell className="px-4 md:px-6">
              {toTitleCase(sub.status)}
            </TableCell>
            <TableCell className="px-4 md:px-6">
              {formatDateUS(sub.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      />
    </div>
  );
};
