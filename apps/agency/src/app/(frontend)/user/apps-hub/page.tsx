import { AppCard } from '@/components/AppCard';
import { sanityFetch } from '@/sanity/live';
import { ALL_APPS_QUERY } from '@/sanity/queries';
import { Bounded, SectionTitle } from '@mns/ui';
import React from 'react';
import { AppRow } from '../_components/AppRow';

const UserAppsHubPage = async (): Promise<React.JSX.Element> => {
  const { data: apps } = await sanityFetch({
    query: ALL_APPS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!apps) {
    return <div>loading...</div>;
  }

  const healthCare = apps.filter((app) => app.type === 'health-care');
  const retails = apps.filter((app) => app.type === 'retail-and-commerce');
  const creative = apps.filter((app) => app.type === 'creative-and-media');
  const restaurant = apps.filter((app) => app.type === 'restaurant');

  return (
    <Bounded size="md" spacing="md">
      <div className="space-y-2">
        <SectionTitle as="h1" size="sm">
          Apps that work as hard as you do.
        </SectionTitle>
        <p>
          Smart little apps that handle the boring stuff, so you can focus on
          the good stuff.
        </p>
      </div>

      <AppRow title="Health Care" apps={healthCare} />
      <AppRow title="Creative & Media" apps={creative} />
      <AppRow title="Retails & Commerce" apps={retails} />
      <AppRow title="Restaurants" apps={restaurant} />
    </Bounded>
  );
};

export default UserAppsHubPage;
