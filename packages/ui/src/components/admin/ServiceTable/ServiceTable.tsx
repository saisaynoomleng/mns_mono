import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card';
import { colors } from '#lib/colors';
import { formatDateUS, replaceUnderscore, toTitleCase } from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';

type ServiceTableProps = {
  className?: string;
  services: Service[];
};

type Service = {
  name: string;
  sanityId: string;
  status: 'active' | 'no_longer_available';
  createdAt: Date | string;
};

const ServiceStatus: Record<Service['status'], string> = {
  active: colors.success[600],
  no_longer_available: colors.error[400],
};

export const ServiceTable = ({
  className,
  services,
}: ServiceTableProps): React.JSX.Element => {
  return (
    <Card className={twMerge(clsx('md:min-w-100', className))}>
      <CardHeader>
        <CardTitle>All services</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        {services.map((s) => (
          <div
            key={s.sanityId}
            className="border border-dotted p-2 border-input rounded-lg"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold">{toTitleCase(s.name)}</p>
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
  );
};
