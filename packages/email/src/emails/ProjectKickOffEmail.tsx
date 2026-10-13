import { Body, Preview, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { toTitleCase } from '@mns/utils';

type ProjectKickOffEmailProps = {
  name: string;
  email: string;
};

const ProjectKickOffEmail = ({ name, email }: ProjectKickOffEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="Your project is officially kicking off" />

      <Body>
        <Preview>We&apos;re excited to get started.</Preview>

        <MainEmailWrapper>
          <Section>
            <Text>Hello {toTitleCase(name)},</Text>

            <Text>
              Your project is confirmed and we&apos;re ready to begin.
              We&apos;ll be in touch at
              <span className="font-semibold text-primary-400"> {email} </span>
              with next steps and timelines. Welcome aboard.
            </Text>
          </Section>
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default ProjectKickOffEmail;
export const renderProjectKickOffEmail = async ({
  name,
  email,
}: ProjectKickOffEmailProps) => {
  return await render(ProjectKickOffEmail({ name, email }));
};
