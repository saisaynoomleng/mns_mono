import { AppCard } from '@/components/AppCard';
import HandwritingTitle from '@/components/HandwritingTitle';
import { pageSEOQuery } from '@/lib/utils';
import { sanityFetch } from '@/sanity/live';
import { ALL_APPS_QUERY } from '@/sanity/queries';
import { Bounded, DashedTitle, SectionTitle } from '@mns/ui';
import type { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const data = await pageSEOQuery('apps-hub-page');

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const AppsHubPage = async (): Promise<React.JSX.Element> => {
  const { data: apps } = await sanityFetch({
    query: ALL_APPS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!apps) {
    return <div>Loading...</div>;
  }

  return (
    <Bounded as="main" size="md" isCentered spacing="md">
      <div className="space-y-4">
        <DashedTitle label="Apps Hub" />
        <SectionTitle as="h1">
          <span className="block">
            {' '}
            <HandwritingTitle>Pick</HandwritingTitle> an app.{' '}
          </span>
          <span className="block">
            <HandwritingTitle>Plug</HandwritingTitle> it in.{' '}
          </span>
          <span className="block">
            Get back to <HandwritingTitle>Business</HandwritingTitle>.
          </span>
        </SectionTitle>
        <p>
          Ready-made apps for your kind of business. Try a live demo, pick a
          plan, and you&apos;re off.
        </p>
      </div>

      <div className="sapce-y-4 md:space-y-6 lg:space-y-12">
        <div className="space-y-2 text-center">
          <SectionTitle as="h2" size="sm">
            Ready to roll
          </SectionTitle>
          <p>
            Built, tested, and waiting for you. Hop into a demo and take one for
            a spin.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {apps
            .filter((app) => app.status === 'production')
            .map((app) => (
              <AppCard key={app._id} appData={app} />
            ))}
        </div>
      </div>

      <div className="sapce-y-4 md:space-y-6 lg:space-y-12">
        <div className="space-y-2 text-center">
          <SectionTitle as="h2" size="sm">
            Cooking in the lab
          </SectionTitle>
          <p>
            We&apos;re busy building these. Peek at what&apos;s next and tell us
            which one you can&apos;t wait for.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {apps
            .filter(
              (app) => app.status === 'test' || app.status === 'development',
            )
            .map((app) => (
              <AppCard key={app._id} appData={app} />
            ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AppsHubPage;
