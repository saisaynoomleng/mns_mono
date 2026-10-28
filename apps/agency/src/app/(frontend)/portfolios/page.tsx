import { PortfolioCard } from '@/components/PortfolioCard';
import { pageSEOQuery } from '@/lib/utils';
import { sanityFetch } from '@/sanity/live';
import { ALL_PORTFOLIO_QUERY } from '@/sanity/queries';
import { Bounded, SectionTitle } from '@mns/ui';
import type { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const data = await pageSEOQuery('portfolio-page');

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const PortfolioPages = async (): Promise<React.JSX.Element> => {
  const { data: portfolios } = await sanityFetch({
    query: ALL_PORTFOLIO_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!portfolios) {
    return <div>loading..</div>;
  }

  return (
    <Bounded as="main" size="md" isCentered>
      <div className="space-y-2 md:space-y-4">
        <SectionTitle as="h1" size="lg">
          Our work, out in the wild
        </SectionTitle>
        <p>
          Real projects, real live links. Take a look around, click everything,
          and see how we turn ideas into things you can actually visit.
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4 text-center">
          <SectionTitle as="h2" size="sm">
            Case Studies
          </SectionTitle>
          <p>
            Every project below started as an idea and ended up on the internet.
            Pick one and step inside.
          </p>
        </div>

        <div className="flex flex-col gap-y-2">
          {portfolios.map((port) => (
            <PortfolioCard key={port._id} portfolio={port} />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default PortfolioPages;
