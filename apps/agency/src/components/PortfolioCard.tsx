'use client';

import { urlFor } from '@/sanity/image';
import { ALL_PORTFOLIO_QUERY_RESULT } from '@/sanity/types';
import {
  Button,
  Card,
  CardContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@mns/ui';
import { replaceDash, toTitleCase } from '@mns/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaCircleArrowRight } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type PortfolioCardProps = {
  className?: string;
  portfolio: NonNullable<ALL_PORTFOLIO_QUERY_RESULT>[number];
};

export const PortfolioCard = ({
  className,
  portfolio,
}: PortfolioCardProps): React.JSX.Element | null => {
  const [open, setOpen] = useState<boolean>(false);

  if (!portfolio) return null;

  const { name, excerpt, imageAlt, imageUrl, type, previewUrl, slug } =
    portfolio;

  return (
    <Card className="shadow shadow-primary">
      <CardContent>
        <Collapsible
          className={twMerge(className)}
          open={open}
          onOpenChange={setOpen}
        >
          <div className="flex justify-between items-center">
            <p className="md:text-fs-600 font-semibold text-primary">{name}</p>
            {type && (
              <p className="p-2 border-2 border-primary text-primary rounded-2xl text-fs-300 font-semibold">
                {toTitleCase(replaceDash(type))}
              </p>
            )}
            <CollapsibleTrigger
              className={clsx(
                'text-primary transition-transform duration-200',
                open ? 'rotate-45!' : 'rotate-0',
              )}
            >
              <FaCircleArrowRight aria-label="expand the portoflio" size={40} />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="grid md:grid-cols-2 justify-between md:gap-x-6">
              <div className="overflow-hidden p-2">
                {imageUrl && (
                  <Image
                    src={urlFor(imageUrl).format('webp').url()}
                    alt={imageAlt ?? ''}
                    width={600}
                    height={400}
                    className="w-full object-contain rounded-lg shadow shadow-primary"
                  />
                )}
              </div>

              <div className="flex flex-col justify-center gap-y-2">
                <p className="prose prose-sm min-w-full">{excerpt}</p>

                <div className="flex gap-x-2 items-center">
                  <Button asChild>
                    <Link href={`/portfolios/${slug}`}>Read the story</Link>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link
                      href={previewUrl as string}
                      rel="noreferrer nofollow"
                      target="_blank"
                    >
                      View Live
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
