import {
  Body,
  Link,
  Preview,
  render,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { LogoEmail } from '../components/LogoEmail.js';
import { EmailFooter } from '../components/EmailFooter.js';

type SignUpVerificationEmailProps = {
  email: string;
  url: string;
  expiresAt?: number;
};

const SignUpVerificationEmail = ({
  url,
  expiresAt = 15,
  email,
}: SignUpVerificationEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="Verify your email address" />

      <Body>
        <Preview>One click to finish creating your account.</Preview>

        <MainEmailWrapper>
          <LogoEmail />

          <Section>
            <Text>Thanks for signing up with {email}.</Text>

            <Text>
              Confirm your email address by opening this{' '}
              <Link
                href={url}
                className="font-semibold text-primary-400 block underline underline-offset-4"
              >
                link
              </Link>
            </Text>
            <Text>
              If you didn&apos;t create an account, you can ignore this email.
            </Text>
          </Section>

          <EmailFooter />
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default SignUpVerificationEmail;
export const renderSignUpVerificationEmail = async ({
  url,
  expiresAt = 15,
  email,
}: SignUpVerificationEmailProps) => {
  return await render(SignUpVerificationEmail({ url, expiresAt, email }));
};
