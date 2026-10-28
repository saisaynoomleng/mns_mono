import { SanityPortableTextComponent } from '@/components/SanityPortableText';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ALL_PORTFOLIO_QUERY, PORTFOLIO_QUERY } from '@/sanity/queries';
import { Bounded, SectionTitle } from '@mns/ui';
import { formatDateUS, PageParamsSlugProps } from '@mns/utils';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import React from 'react';

const getPageData = async ({ params }: PageParamsSlugProps) => {
  const { data } = await sanityFetch({
    query: PORTFOLIO_QUERY,
    stega: false,
    perspective: 'published',
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: PageParamsSlugProps): Promise<Metadata> {
  const data = await getPageData({ params });

  return {
    title: data?.seo?.title ?? '',
    description: data?.seo?.description ?? '',
    openGraph: {
      images: data?.seo?.image ? [data.seo.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const { data: portfolios } = await sanityFetch({
    query: ALL_PORTFOLIO_QUERY,
    stega: false,
    perspective: 'published',
  });

  return portfolios.map((port) => ({
    slug: port.slug,
  }));
}

const PortfolioDetailPage = async ({
  params,
}: PageParamsSlugProps): Promise<React.JSX.Element> => {
  const data = await getPageData({ params });

  if (!data) {
    return <div>loading...</div>;
  }

  const {
    name,
    type,
    imageAlt,
    imageUrl,
    excerpt,
    previewUrl,
    body,
    startedAt,
    endedAt,
    duration,
    pages,
  } = data;

  return (
    <Bounded as="main" size="md" isCentered>
      <div className="text-center flex flex-col justify-center items-center gap-y-4 md:gap-y-6">
        <SectionTitle
          as="h1"
          size="lg"
          className="text-primary font-cursive lowercase"
        >
          {name}
        </SectionTitle>

        <div className="overflow-hidden p-2">
          {imageUrl && (
            <Image
              src={urlFor(imageUrl).format('webp').url()}
              alt={imageAlt ?? ''}
              width={600}
              height={400}
              className="w-full object-contain rounded-lg"
            />
          )}
        </div>

        <p className="prose prose-sm">{excerpt}</p>
      </div>

      <div className="grid md:grid-cols-4 md:place-content-between gap-x-6 gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Started Date</p>
          {startedAt && <p>{formatDateUS(startedAt)}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">On Live Date</p>
          {endedAt && <p>{formatDateUS(endedAt)}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Duration</p>
          <p>{duration} days</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Pages Shipped</p>
          <p>{pages}</p>
        </div>
      </div>

      {body && (
        <div className="prose prose-sm min-w-full">
          <PortableText value={body} components={SanityPortableTextComponent} />
        </div>
      )}
    </Bounded>
  );
};

export default PortfolioDetailPage;
