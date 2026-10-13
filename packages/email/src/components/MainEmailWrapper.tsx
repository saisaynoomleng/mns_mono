import { Container } from 'react-email';
import { LogoEmail } from './LogoEmail.js';
import { EmailFooter } from './EmailFooter.js';

export const MainEmailWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container className="max-w-160 mx-auto mt-8 mobile:mt-0 w-full px-4">
      <LogoEmail />

      {children}

      <EmailFooter />
    </Container>
  );
};
