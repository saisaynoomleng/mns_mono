import { defineQuery } from 'next-sanity';

export const FOOTER_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  footerText,
  footerColumns[]{
    _key,
    links[]{
      _key,
      href,
      label,
    },
    title
  },
  contactInfo
}`);
