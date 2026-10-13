import { Link, render, Section, Tailwind, Text } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailHeader } from '../components/EmailHeader.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';

type DeleteAccountVerificationProps = {
  url: string;
};

const DeleteAccountVerification = ({ url }: DeleteAccountVerificationProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <EmailHeader title="Confirm your account deletion" />

      <MainEmailWrapper>
        <Section>
          <Text>We received a request to delete your account.</Text>

          <Text>
            Confirm by opening this{' '}
            <Link href={url} className="block font-semibold text-primary-400">
              link
            </Link>
          </Text>

          <Text>
            This permanently removes your account and data and can&apos;t be
            undone. If you didn&apos;t request this, ignore this email and your
            account stays as is, but consider changing your password.
          </Text>
        </Section>
      </MainEmailWrapper>
    </Tailwind>
  );
};

export default DeleteAccountVerification;
export const renderDeleteAccountVerification = async ({
  url,
}: DeleteAccountVerificationProps) => {
  return await render(DeleteAccountVerification({ url }));
};
