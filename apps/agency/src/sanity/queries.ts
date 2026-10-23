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

export const CONTACT_PAGE_QUERY = defineQuery(`{
  "contactInfo": *[_type == 'siteSetting'][0]{
                    "street": contactInfo.street,
                    "city": contactInfo.city,
                    "state": contactInfo.state,
                    "zip": contactInfo.zip,
                    "country": contactInfo.country,
                    "lat": contactInfo.lat,
                    "long": contactInfo.long,
                    "email": contactInfo.email,
                    "phone": contactInfo.phone
                  },
  "chatBubble": *[_type == 'chatBubble'
                  && slug.current == $bubble][0]{
                    messages[]{
                      _key,
                      inbound,
                      outbound
                    }
                  }
}`);

export const SOCIAL_LINKS_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  socialLinks[]{
    _key,
    platform,
    url
  }
}`);

export const HEADER_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
   "navLinks": navigation[]{
     _key,
     label,
     href
   },
  "services": footerColumns[title == 'Services'][0]{
    title,
    links[]{
      _key,
      label,
      href,
    }
  }
}`);

export const ALL_APPS_QUERY = defineQuery(`*[_type == 'app'
 && defined(slug.current)]
  | order(name){
  _id,
  name,
  "slug": slug.current,
  isMyanmarOnly,
  status,
  type,
  excerpt,
  "imageUrl": imageUrl.asset->url,
  "imageAlt": imageUrl.alt
 }`);

export const APP_QUERY = defineQuery(`*[_type == 'app'
 && slug.current == $slug][0]{
  name,
  liveUrl,
  demoUrl,
  status,
  isMyanmarOnly,
  type,
  excerpt,
  body,
  "imageUrl": imageUrl.asset->url,
  "imageAlt": imageUrl.alt,
  seo
 }`);

export const ALL_UTILITY_PAGE_QUERY = defineQuery(`*[_type == 'page'
 && defined(slug.current)
 && type == 'utility']{
  'slug': slug.current
 }`);

export const UTILITY_PAGE_QUERY = defineQuery(`*[_type == 'page'
 && defined(slug.current)
 && slug.current == $slug][0]{
  body,
  seo
 }`);
