import {
  Head,
  Html,
  Tailwind,
  Body,
  Container,
  Preview,
  Section,
  Text,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';

const NewsletterEmail = ({ email }: { email: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>You&apos;re subscribed</title>
        </Head>
        <Body>
          <Preview>Thanks for joining our newsletter.</Preview>

          <Container className="max-w-160 mx-auto">
            <Section>
              <Text>Hello,</Text>
              <Text>
                {email} is now subscribed to our newsletter. You&apos;ll get
                news and updates from us. You can unsubscribe at any time using
                the link below.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewsletterEmail;
export const renderNewsletterEmail = async ({ email }: { email: string }) => {
  return await render(NewsletterEmail({ email }));
};
