import { urlFor } from '@/sanity/image';
import { ALL_APPS_QUERY_RESULT } from '@/sanity/types';
import { replaceDash, toTitleCase } from '@mns/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type App = NonNullable<ALL_APPS_QUERY_RESULT>[number];

type AppCardProps = {
  className?: string;
  appData: App;
};

export const AppCard = ({
  className,
  appData,
}: AppCardProps): React.JSX.Element => {
  const {
    name,
    slug,
    status,
    type,
    isMyanmarOnly,
    excerpt,
    imageAlt,
    imageUrl,
  } = appData;

  return (
    <Link
      href={`/apps-hub/${slug}`}
      className={twMerge(
        clsx(
          'p-2 w-fit shadow-md rounded-lg group flex flex-col gap-y-4 justify-center items-center text-center hover:-translate-y-2 transition-transform duration-200 ease-in-out py-4',
          className,
        ),
      )}
    >
      {type && (
        <p className="p-1 bg-secondary w-fit rounded-lg text-fs-300 text-background font-semibold self-start">
          {toTitleCase(replaceDash(type))}
        </p>
      )}
      <div className="group-hover:rotate-10 transition-transform duration-200 ease-in-out">
        {imageUrl ? (
          <Image
            src={urlFor(imageUrl).format('webp').url()}
            alt={imageAlt ?? ''}
            width={300}
            height={300}
            loading="lazy"
            className="object-cover"
          />
        ) : null}
      </div>
      <p className="font-semibold font-header">{name}</p>
      <p className="text-fs-300">{excerpt}</p>
      <p className="italic text-fs-300 text-muted-foreground">
        Available Region: {isMyanmarOnly ? 'Myanmar' : 'Myanmar, U.S.'}
      </p>
    </Link>
  );
};
