import { Body, Preview, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { toTitleCase } from '@mns/utils';

type WelcomeEmailProps = {
  name: string;
  email: string;
};

const WelcomeEmail = ({ name, email }: WelcomeEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="Welcome to mns!" />

      <Body>
        <Preview>Your account is ready.</Preview>

        <MainEmailWrapper>
          <Section>
            <Text>Hello {toTitleCase(name)},</Text>

            <Text>
              Your email
              <span className="font-semibold text-primary-400"> {email} </span>
              is verified and your account is ready. Log in any time to get
              started. If you need anything, just reply to this email.
            </Text>
          </Section>
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default WelcomeEmail;
export const renderWelcomeEmail = async ({
  name,
  email,
}: WelcomeEmailProps) => {
  return await render(WelcomeEmail({ name, email }));
};
