import { Head, Html, Tailwind, Body, Container } from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';

const NewsletterEmail = ({ email }: { email: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head></Head>
        <Body>
          <Container class="max-w-160 mx-auto"></Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewsletterEmail;
