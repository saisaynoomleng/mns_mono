import AgencyContactForm from '@/components/AgencyContactForm';
import HandwritingTitle from '@/components/HandwritingTitle';
import { pageSEOQuery } from '@/lib/utils';
import { Bounded, DashedTitle, SectionTitle, Separator } from '@mns/ui';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const pageName = 'contact-us-page';
  const data = await pageSEOQuery(pageName);

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const ContactUsPage = (): React.JSX.Element => {
  return (
    <Bounded size="md" isCentered as="main" spacing="md">
      <div className="space-y-2 md:space-y-4">
        <DashedTitle label="contact us" />
        <SectionTitle as="h1" size="lg">
          We can <HandwritingTitle>Help</HandwritingTitle>
        </SectionTitle>
      </div>

      <Separator />

      {/* chat bubble */}

      <AgencyContactForm />

      <div className="grid md:grid-cols-2 md:gap-x-6 gap-y-4">
        {/* map */}
        <div></div>

        <div></div>
      </div>
    </Bounded>
  );
};

export default ContactUsPage;
