import { Body, Preview, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';

type OTPValidationEmailProps = {
  otp: string;
  expiresAt?: number;
};

const OTPValidationEmail = ({
  otp,
  expiresAt = 15,
}: OTPValidationEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="Your verification code" />

      <Body>
        <Preview>Use this code to continue. It expires in 15 minutes.</Preview>

        <MainEmailWrapper>
          <Section>
            <Text>Hello,</Text>
            <Text>
              Your verification code is
              <span className="font-semibold text-primary-400 block">
                {otp}
              </span>
            </Text>
            <Text>
              It expires in
              <span className="font-semibold text-primary-400">
                {' '}
                {expiresAt}{' '}
              </span>
              minutes. Never share this code with anyone. We will never ask for
              it. If you didn&apos;t request it, you can ignore this email.
            </Text>
          </Section>
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default OTPValidationEmail;
export const renderOTPValidationEmail = async ({
  otp,
  expiresAt = 15,
}: OTPValidationEmailProps) => {
  return await render(OTPValidationEmail({ otp, expiresAt }));
};
