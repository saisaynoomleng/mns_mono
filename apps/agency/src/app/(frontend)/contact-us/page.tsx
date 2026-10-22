import AgencyContactForm from '@/components/AgencyContactForm';
import HandwritingTitle from '@/components/HandwritingTitle';
import { MapBox } from '@/components/MapBox';
import { pageSEOQuery } from '@/lib/utils';
import { sanityFetch } from '@/sanity/live';
import { CONTACT_PAGE_QUERY } from '@/sanity/queries';
import { Bounded, DashedTitle, SectionTitle, Separator } from '@mns/ui';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const pageName = 'contact-us-page';
  const data = await pageSEOQuery(pageName);

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const ContactUsPage = async (): Promise<React.JSX.Element> => {
  const params = {
    bubble: 'contact-us-chat-bubble',
  };

  const { data } = await sanityFetch({
    query: CONTACT_PAGE_QUERY,
    stega: false,
    perspective: 'published',
    params,
  });

  const { chatBubble, contactInfo } = data;

  if (!contactInfo && !chatBubble) {
    return <div>loading</div>;
  }

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

      <div className="grid md:grid-cols-[2fr_1fr] md:gap-x-6 gap-y-4">
        <div className="max-md:hidden">
          <MapBox
            lat={contactInfo?.lat as number}
            long={contactInfo?.long as number}
          />
        </div>

        <div className="md:hidden mx-auto">
          <MapBox
            lat={contactInfo?.lat as number}
            long={contactInfo?.long as number}
            width={320}
            height={320}
          />
        </div>

        <div className="flex flex-col gap-y-4 md:gap-y-6">
          <div className="flex flex-col gap-y-2">
            <DashedTitle label="contacts" />
            <p className="font-semibold">Sales</p>
            <p>
              <Link
                href={`tel:${contactInfo?.phone}`}
                className="hover:text-primary"
              >
                {contactInfo?.phone}
              </Link>
            </p>
            <p>
              <Link
                href={`mailto:${contactInfo?.email}`}
                className="hover:text-primary"
              >
                {contactInfo?.email}
              </Link>
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-y-2">
            <DashedTitle label="office" />
            <address>
              <p>{contactInfo?.street}</p>

              <p>
                <span>{contactInfo?.city}, </span>
                <span>{contactInfo?.state}. </span>
                <span>{contactInfo?.zip}</span>
              </p>

              <p>{contactInfo?.country}</p>
            </address>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default ContactUsPage;
