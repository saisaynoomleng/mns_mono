import HandwritingTitle from '@/components/HandwritingTitle';
import ServiceCard from '@/components/ServiceCard';
import { pageSEOQuery } from '@/lib/utils';
import { sanityFetch } from '@/sanity/live';
import { ALL_SERVICES_QUERY } from '@/sanity/queries';
import { Bounded, DashedTitle, SectionTitle } from '@mns/ui';
import type { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const pageName = 'service-page';
  const data = await pageSEOQuery(pageName);

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const ServicesPage = async (): Promise<React.JSX.Element> => {
  const { data: services } = await sanityFetch({
    query: ALL_SERVICES_QUERY,
    perspective: 'published',
    stega: false,
  });

  if (!services) {
    return <div>Loading...</div>;
  }

  return (
    <Bounded as="main" size="md" isCentered>
      <div className="space-y-2 md:space-y-4">
        <DashedTitle label="Our Services" />
        <SectionTitle as="h1" size="lg">
          <HandwritingTitle className="block">Ready-made</HandwritingTitle>
          <span> or </span>
          <HandwritingTitle className="block">made-for-you</HandwritingTitle>
          Your call.
        </SectionTitle>
      </div>

      <div className="space-y-4 md:space-y-5">
        <div className="space-y-2 md:space-y-4 text-center">
          <SectionTitle as="h2" size="sm">
            Pick your flavor
          </SectionTitle>
          <p>
            Ready-made apps, custom builds, or a head start. Choose what fits
            your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 md:gap-x-6 gap-y-4">
          {services.map((service) => (
            <ServiceCard service={service} key={service._id} />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default ServicesPage;
