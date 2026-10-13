import { Head } from 'react-email';
import { EmailFont } from './EmailFont.js';

export const EmailHeader = ({ title }: { title: string }) => {
  return (
    <Head>
      <EmailFont />
      <title>{title}</title>
    </Head>
  );
};
