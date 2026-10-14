import { Body, Preview, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { toTitleCase } from '@mns/utils';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { UnsubscribeLink } from '../components/UnsubscribeLink.js';

type ProductUpdateEmailProps = {
  subject: string;
  message: string;
  email: string;
};

const ProductUpdateEmail = ({
  subject,
  message,
  email,
}: ProductUpdateEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title={`What’s new at mns`} />

      <Body>
        <MainEmailWrapper>
          <Section>
            <Text>Hello,</Text>
            <Text>
              We&apos;ve shipped something new. Here&apos;s what changed.
            </Text>
            <Text>
              You&apos;re getting this because
              <span className="font-semibold text-primary-400">{email}</span>
              is subscribed. Unsubscribe any time using the link below.
            </Text>

            <Text>{message}</Text>
          </Section>
        </MainEmailWrapper>

        <UnsubscribeLink email={email} />
      </Body>
    </Tailwind>
  );
};

export default ProductUpdateEmail;
export const renderProductUpdateEmail = async ({
  email,
  subject,
  message,
}: ProductUpdateEmailProps) => {
  return await render(ProductUpdateEmail({ email, subject, message }));
};
