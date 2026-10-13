import { Body, Preview, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { toTitleCase } from '@mns/utils';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';

type ReplyToContactEmailProps = {
  email: string;
  name: string;
  subject: string;
  message: string;
};

const ReplyToContactEmail = ({
  name,
  subject,
  email,
  message,
}: ReplyToContactEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="Reply to your previous message" />

      <Body>
        <Preview>{toTitleCase(subject)}</Preview>

        <MainEmailWrapper>
          <Section>
            <Text>Hello {name ? toTitleCase(name) : 'there'},</Text>

            <Text>Thanks for reaching out.</Text>

            <Text>{message}</Text>

            <Text>
              If you have more questions, just reply to this email and
              we&apos;ll get back to you. The mns team
            </Text>
          </Section>
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default ReplyToContactEmail;
export const renderReplyToContactEmail = async ({
  name,
  email,
  message,
  subject,
}: ReplyToContactEmailProps) => {
  return await render(ReplyToContactEmail({ name, email, message, subject }));
};
