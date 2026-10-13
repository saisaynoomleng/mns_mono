import { Font } from 'react-email';

export const EmailFont = () => {
  return (
    <Font
      fontFamily="Fraunces"
      fallbackFontFamily="serif"
      webFont={{
        url: 'https://cdn.jsdelivr.net/fontsource/fonts/fraunces@latest/latin-400-normal.woff2',
        format: 'woff2',
      }}
      fontWeight={400}
      fontStyle="normal"
    />
  );
};
