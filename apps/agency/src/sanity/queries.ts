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

export const PAGE_SEO_QUERY = defineQuery(`*[_type == 'page'
 && defined(slug.current
 && slug == $pageName)][0]{
  "title": seo.metaTitle,
  "description": seo.metaDescription
 }`);

export const CONTACT_INFO_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "street": contactInfo.street,
  "city": contactInfo.city,
  "state": contactInfo.state,
  "zip": contactInfo.zip,
  "country": contactInfo.country,
  "lat": contactInfo.lat,
  "long": contactInfo.long,
  "email": contactInfo.email,
  "phone": contactInfo.phone
}`);
