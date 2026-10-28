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
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TbLayoutBottombarCollapseFilled } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

type PortfolioCardProps = {
  className?: string;
  portfolio: NonNullable<ALL_PORTFOLIO_QUERY_RESULT>[number];
};

export const PortfolioCard = ({
  className,
  portfolio,
}: PortfolioCardProps): React.JSX.Element | null => {
  if (!portfolio) return null;

  const {
    name,
    excerpt,
    body,
    imageAlt,
    imageUrl,
    type,
    startedAt,
    endedAt,
    previewUrl,
    slug,
  } = portfolio;

  return (
    <Card className="shadow shadow-primary">
      <CardContent>
        <Collapsible className={twMerge(className)}>
          <div className="grid grid-cols-[auto_max-content_min-content] gap-x-4 md:gap-x-6 items-center">
            <p className="md:text-fs-600 font-semibold text-primary">{name}</p>
            {type && (
              <p className="p-2 border-2 border-primary text-primary rounded-2xl text-fs-300 font-semibold">
                {toTitleCase(replaceDash(type))}
              </p>
            )}
            <CollapsibleTrigger asChild>
              <Button>
                <TbLayoutBottombarCollapseFilled aria-label="expand the portoflio" />
              </Button>
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

              <div className="flex flex-col gap-y-2">
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
                      Live URL
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
