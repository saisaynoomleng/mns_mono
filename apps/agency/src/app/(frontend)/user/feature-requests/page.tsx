import { sanityFetch } from '@/sanity/live';
import { ALL_APPS_QUERY } from '@/sanity/queries';
import { Bounded, SectionTitle } from '@mns/ui';
import React from 'react';
import { AgencyFeatureRequestForm } from './_components/AgencyFeatureRequestForm';
import { AgencyFeatureRequestList } from './_components/AgencyFeatureRequestList';

const UserFeatureRequestPage = async () => {
  const { data: apps } = await sanityFetch({
    query: ALL_APPS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!apps) {
    return <div>loading...</div>;
  }

  return (
    <Bounded as={'main'} size="md" isCentered>
      <div className="space-y-2">
        <SectionTitle as="h1" size="sm">
          Got an idea? We&apos;re all ears.
        </SectionTitle>
        <p>
          Pick an app, share what you&apos;d love to see, and send it our way.
        </p>
      </div>

      <AgencyFeatureRequestForm apps={apps} />

      <div className="space-y-4">
        <div className="space-y-2">
          <SectionTitle as="h2" size="sm">
            Your idea pile
          </SectionTitle>
          <p>Every bright idea you&apos;ve sent our way, all in one place.</p>
        </div>

        <AgencyFeatureRequestList />
      </div>
    </Bounded>
  );
};

export default UserFeatureRequestPage;
