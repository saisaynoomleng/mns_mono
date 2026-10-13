import { Body, Preview, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { formatDateTimeUS, toTitleCase } from '@mns/utils';

type NewDeviceAlertEmailProps = {
  name: string;
  email: string;
  date: Date | string;
};

const NewDeviceAlertEmail = ({
  name,
  email,
  date,
}: NewDeviceAlertEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="New sign-in to your account" />

      <Body>
        <Preview>We noticed a login from a new device.</Preview>

        <MainEmailWrapper>
          <Section>
            <Text>Hello {toTitleCase(name)},</Text>
            <Text>
              We noticed a sign-in to
              <span className="font-semibold text-primary-400"> {email} </span>
              from a new device on{' '}
              <span className="font-semibold text-primary-400">
                {formatDateTimeUS(date)}{' '}
              </span>
              .
            </Text>

            <Text>
              If this was you, no action is needed. If not, reset your password
              right away.
            </Text>
          </Section>
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default NewDeviceAlertEmail;
export const renderNewDeviceAlertEmail = async ({
  name,
  email,
  date,
}: NewDeviceAlertEmailProps) => {
  return await render(NewDeviceAlertEmail({ name, email, date }));
};
