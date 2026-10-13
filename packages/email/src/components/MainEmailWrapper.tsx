import { Container } from 'react-email';

export const MainEmailWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container className="max-w-160 mx-auto mt-8 mobile:mt-0 w-full px-4">
      {children}
    </Container>
  );
};
