import { BackTo } from '@/components/BackTo';
import { SanityPortableTextComponent } from '@/components/SanityPortableText';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ALL_APPS_QUERY, APP_QUERY } from '@/sanity/queries';
import { Bounded, Button, SectionTitle } from '@mns/ui';
import { PageParamsSlugProps, replaceDash, toTitleCase } from '@mns/utils';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const pageData = async ({ params }: PageParamsSlugProps) => {
  const { data } = await sanityFetch({
    query: APP_QUERY,
    stega: false,
    perspective: 'published',
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: PageParamsSlugProps): Promise<Metadata> {
  const data = await pageData({ params });

  return {
    title: data?.seo?.metaTitle ?? '',
    description: data?.seo?.metaDescription ?? '',
  };
}

export async function generateStaticParams() {
  const { data: apps } = await sanityFetch({
    query: ALL_APPS_QUERY,
    stega: false,
    perspective: 'published',
  });

  return apps.map((app) => ({
    slug: app.slug,
  }));
}

const AppDetailPage = async ({
  params,
}: PageParamsSlugProps): Promise<React.JSX.Element | null> => {
  const data = await pageData({ params });

  if (!data) return null;

  const {
    name,
    liveUrl,
    demoUrl,
    status,
    isMyanmarOnly,
    type,
    excerpt,
    body,
    imageAlt,
    imageUrl,
  } = data;

  return (
    <Bounded size="md" isCentered as="main">
      <BackTo href="/apps-hub" label="all apps" />

      <div className="flex gap-x-4 md:gap-x-6 gap-y-4 flex-col md:flex-row">
        <div>
          {imageUrl && (
            <Image
              src={urlFor(imageUrl).format('webp').url()}
              alt={imageAlt ?? ''}
              width={300}
              height={300}
              className="object-cover shadow mx-auto"
            />
          )}
        </div>

        <div className="flex flex-col justify-around gap-y-2">
          <div className="flex gap-x-2 items-center">
            <SectionTitle as="h1" size="sm">
              {name}
            </SectionTitle>
            {type && (
              <p className="bg-secondary text-fs-300 rounded-lg text-background p-1">
                {toTitleCase(replaceDash(type))}
              </p>
            )}
          </div>

          <div className="flex gap-x-2">
            <Button
              asChild
              disabled={status !== 'production'}
              className={clsx(status !== 'production' && 'bg-muted-foreground')}
            >
              <Link
                href={liveUrl as string}
                target="_blank"
                rel="nofollow noreferrer"
                className={clsx(
                  status !== 'production'
                    ? 'pointer-events-none cursor-not-allowed'
                    : 'pointer-events-auto cursor-pointer',
                )}
              >
                <span>Preview App</span>
                <span>
                  <FaExternalLinkAlt />
                </span>
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              disabled={status !== 'production'}
              className={clsx(status !== 'production' && 'bg-muted-foreground')}
            >
              <Link
                href={demoUrl as string}
                target="_blank"
                rel="nofollow noreferrer"
                className={clsx(
                  status !== 'production'
                    ? 'pointer-events-none cursor-not-allowed'
                    : 'pointer-events-auto cursor-pointer',
                )}
              >
                <span>Demo App</span>
                <span>
                  <FaExternalLinkAlt />
                </span>
              </Link>
            </Button>
          </div>

          <p>{excerpt}</p>

          <p>
            This app is only available in{' '}
            {isMyanmarOnly ? 'Myanmar' : 'Myanmar & United States'}.
          </p>

          {status !== 'production' && (
            <p className="italic text-secondary">
              This app is not in production, you won&apos;t be able to launch or
              demo the app yet.
            </p>
          )}
        </div>
      </div>

      {body && (
        <div className="prose min-w-full">
          <PortableText value={body} components={SanityPortableTextComponent} />
        </div>
      )}
    </Bounded>
  );
};

export default AppDetailPage;
