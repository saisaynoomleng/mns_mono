import type { Metadata } from 'next';
import './globals.css';
import { Fraunces, Sora, Playpen_Sans } from 'next/font/google';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  style: 'normal',
  subsets: ['latin'],
});

const sora = Sora({
  variable: '--font-sora',
  style: 'normal',
  subsets: ['latin'],
});

const playpen_sans = Playpen_Sans({
  variable: '--font-playpen-sans',
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | mns',
    default: 'mns',
  },
  description: 'MNS Admin dashboard',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${fraunces.variable} ${playpen_sans.variable} ${sora.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
