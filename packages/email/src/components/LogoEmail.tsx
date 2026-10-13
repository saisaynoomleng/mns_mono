import { Img, Section } from 'react-email';

const LOGO_URL = `https://cdn.sanity.io/images/u8g9bo5v/production/171c83028375cf96f5e68f651425dadbf2b5492f-804x226.png`;

export const LogoEmail = () => {
  return (
    <Section className="max-w-100 mx-auto">
      <Img
        src={LOGO_URL}
        alt="logo"
        loading="lazy"
        width={200}
        height={50}
        className="mx-auto"
      />
    </Section>
  );
};
