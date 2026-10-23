import { SanityPortableTextComponent } from '@/components/SanityPortableText';
import { sanityFetch } from '@/sanity/live';
import { ALL_UTILITY_PAGE_QUERY, UTILITY_PAGE_QUERY } from '@/sanity/queries';
import { Bounded } from '@mns/ui';
import { PageParamsSlugProps } from '@mns/utils';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import React from 'react';

const getPageData = async ({ params }: PageParamsSlugProps) => {
  const { data } = await sanityFetch({
    query: UTILITY_PAGE_QUERY,
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
    title: data?.seo?.metaTitle ?? '',
    description: data?.seo?.metaDescription ?? '',
  };
}

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: ALL_UTILITY_PAGE_QUERY,
    stega: false,
    perspective: 'published',
  });

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

const UtilityPage = async ({
  params,
}: PageParamsSlugProps): Promise<React.JSX.Element> => {
  const data = await getPageData({ params });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Bounded as="main" size="md" isCentered>
      {data.body && (
        <div className="prose min-w-full">
          <PortableText
            value={data.body}
            components={SanityPortableTextComponent}
          />
        </div>
      )}
    </Bounded>
  );
};

export default UtilityPage;
