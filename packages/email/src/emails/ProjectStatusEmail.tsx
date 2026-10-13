import type { ProjectStatus } from '@mns/utils';
import { Body, Preview, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';

type ProjectStatusEmailProps = {
  status?: ProjectStatus;
  email: string;
};

const ProjectStatusEmail = ({
  status = 'concept',
  email,
}: ProjectStatusEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title={`Project update: ${status}`} />

      <Body>
        <Preview>Your project status has changed.</Preview>

        <MainEmailWrapper>
          <Section>
            <Text>
              Your project status is now:
              <span className="font-semibold text-primary-400"> {status}.</span>
            </Text>

            <Text>
              We&apos;ll keep you posted at
              <span className="font-semibold text-primary-400"> {email} </span>
              as things move forward. Reply to this email if you have questions.
            </Text>
          </Section>
        </MainEmailWrapper>
      </Body>
    </Tailwind>
  );
};

export default ProjectStatusEmail;
export const renderProjectStatusEmail = async ({
  status = 'concept',
  email,
}: ProjectStatusEmailProps) => {
  return await render(ProjectStatusEmail({ status, email }));
};
