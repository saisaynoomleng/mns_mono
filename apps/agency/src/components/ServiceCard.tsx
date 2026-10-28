import { urlFor } from '@/sanity/image';
import { ALL_SERVICES_QUERY_RESULT } from '@/sanity/types';
import { toTitleCase } from '@mns/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type ServiceCardProps = {
  className?: string;
  service: NonNullable<ALL_SERVICES_QUERY_RESULT>[number];
};

const ServiceCard = ({
  className,
  service,
}: ServiceCardProps): React.JSX.Element | null => {
  if (!service) return null;

  const { name, slug, imageAlt, imageUrl, excerpt } = service;

  return (
    <Link
      href={`/services/${slug}`}
      className={twMerge(
        clsx(
          'flex flex-col gap-y-4 md:gap-y-8 text-center border p-4 border-input rounded-lg group',
          className,
        ),
      )}
    >
      <p className="font-semibold text-fs-500 group-hover:text-primary">
        {toTitleCase(name as string)}
      </p>
      <div className="overflow-hidden relative">
        {imageUrl && (
          <Image
            src={urlFor(imageUrl).width(200).height(200).format('webp').url()}
            width={100}
            height={100}
            alt={imageAlt ?? ''}
            className="object-cover mx-auto w-30 h-30 group-hover:rotate-360 duration-100 transition-transform"
          />
        )}
      </div>
      <p className="text-fs-300 prose prose-sm">{excerpt}</p>
    </Link>
  );
};

export default ServiceCard;
