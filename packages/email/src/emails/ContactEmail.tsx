import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  render,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { toTitleCase } from '@mns/utils';

type ContactEmailProps = {
  name: string;
  email: string;
};

const ContactEmail = ({ name, email }: ContactEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>We received your message</title>
        </Head>

        <Body>
          <Preview>Thanks for reaching out. We&apos;ll reply soon.</Preview>

          <Container className="max-w-160 mx-auto">
            <Section>
              <Text>Hello {toTitleCase(name)},</Text>

              <Text>
                Thanks for contacting us. We got your message and will reply to{' '}
                {email} as soon as we can.
              </Text>
            </Section>
          </Container>
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
