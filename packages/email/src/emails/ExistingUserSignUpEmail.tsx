import {
  Body,
  Column,
  Preview,
  render,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { formatDateTimeUS } from '@mns/utils';

type ExistingUserSignUpEmailProps = {
  date: string | Date;
  email: string;
};

const ExistingUserSignUpEmail = ({
  date,
  email,
}: ExistingUserSignUpEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="Someone tried to sign up with your email" />

      <Body>
        <Preview>You already have an account with uss</Preview>

        <MainEmailWrapper>
          <Section>
            <Text>
              Someone tried to create a new account using{' '}
              <span className="font-semibold text-primary-400">{email}</span>.
            </Text>

            <Section>
              <Row align="left">
                <Column align="left">Date</Column>
                <Column
                  align="left"
                  className="font-semibold text-primary-400 text-sm"
                >
                  {formatDateTimeUS(date)}
                </Column>
              </Row>
            </Section>

            <Text>
              You already have an account, so nothing changed. If it was you,
              log in or reset your password. If it wasn&apos;t, you can ignore
              this email.
            </Text>
          </Section>
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default ExistingUserSignUpEmail;
export const renderExistingUserSignUpEmail = async ({
  date,
  email,
}: ExistingUserSignUpEmailProps) => {
  return await render(ExistingUserSignUpEmail({ date, email }));
};
