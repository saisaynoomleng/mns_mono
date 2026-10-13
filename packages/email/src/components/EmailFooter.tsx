import { Column, Img, Link, Row, Section, Text } from 'react-email';

const FACEBOOK_LOGO_URL = `https://cdn.sanity.io/images/u8g9bo5v/production/ba72889b6d6280804c8bedbb0f841182320186bf-640x640.png`;

export const EmailFooter = () => {
  return (
    <Section>
      <Section align="left">
        <Link
          href="https://www.facebook.com"
          rel="noreferrer nofollow"
          target="_blank"
          className="max-w-10 block"
        >
          <Img
            src={FACEBOOK_LOGO_URL}
            alt="facebook logo"
            width={40}
            height={40}
            className=""
          />
        </Link>
      </Section>

      <Section>
        <Text>
          5000 Euclid Ave <br />
          Cleveland, OH. 44103 <br />
          United States
        </Text>
      </Section>

      <Section className="min-w-full">
        <Link
          href="https://mnsart.com"
          className="text-primary-400 underline underline-offset-4"
        >
          Visit our website
        </Link>
      </Section>
    </Section>
  );
};
