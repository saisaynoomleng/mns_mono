import {
  Html,
  Tailwind,
  Body,
  Preview,
  Section,
  Text,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { UnsubscribeLink } from '../components/UnsubscribeLink.js';
import { MainEmailWrapper } from '../components/MainEmailWrapper.js';
import { EmailHeader } from '../components/EmailHeader.js';

const NewsletterEmail = ({ email }: { email: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <EmailHeader title={`You're subscribed!`} />

        <Body>
          <Preview>Thanks for joining our newsletter.</Preview>

          <MainEmailWrapper>
            <Section>
              <Text>Hello,</Text>
              <Text>
                <span className="font-semibold">{email} </span>
                is now subscribed to our newsletter. You&apos;ll get news and
                updates from us. You can unsubscribe at any time using the link
                below.
              </Text>
            </Section>
          </MainEmailWrapper>

          <UnsubscribeLink email={email} />
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewsletterEmail;
export const renderNewsletterEmail = async ({ email }: { email: string }) => {
  return await render(NewsletterEmail({ email }));
};
