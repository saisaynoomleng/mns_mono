import {
  Body,
  Html,
  Preview,
  render,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { toTitleCase } from '@mns/utils';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { EmailHeader } from '../components/EmailHeader.js';

type ContactEmailProps = {
  name: string;
  email: string;
};

const ContactEmail = ({ name = 'hi', email }: ContactEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <EmailHeader title="We received your message" />

        <Body>
          <Preview>Thanks for reaching out. We&apos;ll reply soon.</Preview>

          <MainEmailWrapper>
            <Section>
              <Text>Hello {toTitleCase(name)},</Text>

              <Text>
                Thanks for contacting us. We got your message and will reply to{' '}
                {email} as soon as we can.
              </Text>
            </Section>
          </MainEmailWrapper>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ContactEmail;
export const renderContactEmail = async ({
  name,
  email,
}: ContactEmailProps) => {
  return await render(ContactEmail({ name, email }));
};
