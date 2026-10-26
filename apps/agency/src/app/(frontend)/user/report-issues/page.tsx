import { sanityFetch } from '@/sanity/live';
import { ALL_APPS_QUERY } from '@/sanity/queries';
import { Bounded, SectionTitle } from '@mns/ui';
import React from 'react';
import AgencyUserReportIssueForm from './_components/AgencyUserReportIssueForm';

const UserReportIssuePage = async (): Promise<React.JSX.Element> => {
  const { data: apps } = await sanityFetch({
    query: ALL_APPS_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!apps) {
    return <div>loading...</div>;
  }

  return (
    <Bounded size="md" isCentered as="main">
      <div className="space-y-4">
        <SectionTitle as="h1" size="sm">
          Something acting up? Let&apos;s fix it.
        </SectionTitle>
        <p>
          Pick the app, tell us what went wrong, and we&apos;ll take it from
          there.
        </p>
      </div>
      <AgencyUserReportIssueForm apps={apps} />
    </Bounded>
  );
};

export default UserReportIssuePage;
