'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@mns/ui';
import { colors } from '@mns/ui/colors';
import { formatDateUS, replaceUnderscore, toTitleCase } from '@mns/utils';
import clsx from 'clsx';
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
    <div className="grid md:grid-cols-[max-content_1fr] gap-y-4 md:gap-x-6">
      <Card className={twMerge(clsx('md:min-w-100', className))}>
        <CardHeader>
          <CardTitle>All services</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-2">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Available Subscription Plans for{' '}
            <span className="text-primary">{selectedService.name}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {selectedService.subscriptions.length ? (
            <div>{/* subscription plans */}</div>
          ) : (
            <div>
              <p>
                No subscrition plans to display yet, add more subscription
                plans.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
