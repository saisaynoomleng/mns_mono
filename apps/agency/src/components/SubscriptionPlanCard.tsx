import { SERVICE_QUERY_RESULT } from '@/sanity/types';
import { Button, Separator } from '@mns/ui';
import { formatPriceInUSD, toTitleCase } from '@mns/utils';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type SubscriptionPlanCardProps = {
  className?: string;
  plan: NonNullable<SERVICE_QUERY_RESULT>['plans'][number];
};

const SubscriptionPlanCard = ({
  className,
  plan,
}: SubscriptionPlanCardProps): React.JSX.Element | null => {
  if (!plan) return null;

  const {
    name,
    slug,
    includedFeatures,
    notIncludedFeatures,
    pricePerMonth,
    type,
  } = plan;

  return (
    <div
      className={twMerge(
        clsx(
          'max-w-100 flex flex-col gap-y-4 border p-4 border-input rounded-lg',
          className,
        ),
      )}
    >
      <p className="font-semibold text-fs-500">{toTitleCase(name as string)}</p>
      {pricePerMonth && (
        <p className="text-primary">
          <span>{formatPriceInUSD(pricePerMonth)}</span>
          /month
        </p>
      )}

      <ul className="list-inside list-disc flex flex-col gap-y-2">
        <p className="font-semibold">What&apos;s included</p>
        {includedFeatures &&
          includedFeatures.map((f) => (
            <li key={f} className="marker:text-primary">
              {f}
            </li>
          ))}
      </ul>

      {type?.toLowerCase() === 'enterprise' && (
        <>
          <Separator />
          <ul className="list-inside list-disc flex flex-col gap-y-2">
            <p className="font-semibold">What&apos;s NOT included</p>
            {notIncludedFeatures &&
              notIncludedFeatures.map((f) => (
                <li key={f} className="marker:text-primary">
                  {f}
                </li>
              ))}
          </ul>
        </>
      )}

      <div className="mt-auto">
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;
