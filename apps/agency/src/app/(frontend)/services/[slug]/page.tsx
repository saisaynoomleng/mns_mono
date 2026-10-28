import { BackTo } from '@/components/BackTo';
import { SanityPortableTextComponent } from '@/components/SanityPortableText';
import SubscriptionPlanCard from '@/components/SubscriptionPlanCard';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ALL_SERVICES_QUERY, SERVICE_QUERY } from '@/sanity/queries';
import { Bounded, DashedTitle, SectionTitle } from '@mns/ui';
import { formatPriceInUSD, PageParamsSlugProps } from '@mns/utils';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import React from 'react';

const getPageData = async ({ params }: PageParamsSlugProps) => {
  const { data } = await sanityFetch({
    query: SERVICE_QUERY,
    perspective: 'published',
    stega: false,
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
      images: data?.seo?.imageUrl ? [data?.seo?.imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const { data: services } = await sanityFetch({
    query: ALL_SERVICES_QUERY,
    stega: false,
    perspective: 'published',
  });

  return services.map((service) => ({
    slug: service.slug,
  }));
}

const ServieDetailPage = async ({
  params,
}: PageParamsSlugProps): Promise<React.JSX.Element> => {
  const data = await getPageData({ params });

  if (!data) return <div>loading...</div>;

  const { name, excerpt, imageAlt, imageUrl, body, price, plans } = data;

  return (
    <Bounded as="main" size="md" isCentered>
      <BackTo label="all services" href="/services" />

      <div className="space-y-2 md:space-y-6">
        <DashedTitle label="Service Detail" />

        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-6">
          <div className="overflow-hidden aspect-square">
            {imageUrl && (
              <Image
                src={urlFor(imageUrl).format('webp').url()}
                alt={imageAlt ?? ''}
                width={200}
                height={200}
                className="w-50 object-cover mx-auto"
              />
            )}
          </div>

          <div className="flex flex-col gap-y-2 md:gap-y-4">
            <SectionTitle as="h1" size="md">
              {name}
            </SectionTitle>
            <p className="prose min-w-full">{excerpt}</p>
            {price ? (
              <p>
                Price:{' '}
                <span className="text-primary font-bold">
                  {formatPriceInUSD(price)}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {body && (
        <div className="prose prose-sm min-w-full">
          <PortableText value={body} components={SanityPortableTextComponent} />
        </div>
      )}

      {plans.length > 1 ? (
        <div className="space-y-4 md:space-y-6">
          <SectionTitle as="h2" size="sm" className="text-center">
            Available Plans
          </SectionTitle>

          <div className="flex gap-x-4 md:gap-x-6 justify-center">
            {plans.map((plan) => (
              <SubscriptionPlanCard key={plan._id} plan={plan} />
            ))}
          </div>
        </div>
      ) : null}
    </Bounded>
  );
};

export default ServieDetailPage;
