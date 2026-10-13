import { Container, Link, Section } from 'react-email';

export const UnsubscribeLink = ({ email }: { email: string }) => {
  return (
    <Container className="text-center mx-auto">
      <Section className="w-[50%] h-px mx-auto bg-black-950/20 my-6" />

      <Section>
        <Link
          href={`https://mnsart.com/unsubscribe?email=${encodeURIComponent(email)}`}
          className="text-sm underline"
          target="_blank"
        >
          Unsubscribe
        </Link>
      </Section>
    </Container>
  );
};
