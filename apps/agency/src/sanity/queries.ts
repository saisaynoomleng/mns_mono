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
 && defined(slug.current)
 && slug.current == $pageName][0]{
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
  "imageAlt": imageUrl.alt,
  liveUrl,
  demoUrl,
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

export const ALL_SERVICES_QUERY = defineQuery(`*[_type == 'service'
 && defined(slug.current)]{
  _id,
  name,
  "imageUrl": imageUrl.asset->url,
  "imageAlt": imageUrl.alt,
  "slug": slug.current,
  excerpt
 }`);

export const SERVICE_QUERY = defineQuery(`*[_type == "service"
 && defined(slug.current)
 && slug.current == $slug][0]{
  name,
  excerpt,
  "imageUrl": imageUrl.asset->url,
  "imageAlt": imageUrl.alt,
  body,
  seo{
    "title": metaTitle,
    "description": metaDescription,
    "imageUrl": ogImage.asset->url
  },
  price,
  "plans": *[_type == 'subscriptionPlan'
            && defined(slug.current)
            && references(^._id)]
            | order(pricePerMonth){
              _id,
              name,
              "slug": slug.current,
              includedFeatures,
              notIncludedFeatures,
              pricePerMonth,
              "type": ^.name
            }
 }`);

export const ALL_PORTFOLIO_QUERY = defineQuery(`*[_type == 'portfolio'
 && defined(slug.current)]
  | order(_createdAt){
    _id,
    name,
    "slug": slug.current,
    type,
    "imageUrl": imageUrl.asset->url,
    "imageAlt": imageUrl.alt,
    excerpt,
    previewUrl,
  }`);

export const PORTFOLIO_QUERY = defineQuery(`*[_type == 'portfolio'
 && defined(slug.current)
 && slug.current == $slug][0]{
    name,
    type,
    "imageUrl": imageUrl.asset->url,
    "imageAlt": imageUrl.alt,
    excerpt,
    previewUrl,
    body,
    startedAt,
    endedAt,
    seo{
      "title": metaTitle,
      "description": metaDescription,
      "image": ogImage.asset->url
    },
    "duration": (dateTime(endedAt + "T00:00:00Z") - dateTime(startedAt + "T00:00:00Z")) / 86400,
    pages
  }`);

export const ALL_PRICING_QUERY = defineQuery(`{
  "plugs": *[_type == 'subscriptionPlan'
           && defined(slug.current)
           && references("0af90c0f-1dda-4ec3-9ab5-8e64eabd99e6")]
            | order(pricePerMonth){
              _id,
              name,
              "slug": slug.current,
              includedFeatures,
              notIncludedFeatures,
              pricePerMonth,
              "type": "plug & play"
            },
  "enterprises": *[_type == 'subscriptionPlan'
           && defined(slug.current)
           && references("1e4a3006-9128-477b-b2ef-b6c012a94e15")]
            | order(pricePerMonth){
              _id,
              name,
              "slug": slug.current,
              includedFeatures,
              notIncludedFeatures,
              pricePerMonth,
              "type": "enterprise"
            },
  "onboarding": *[_type == 'service'
                 && defined(slug.current)
                 && slug.current == 'onboarding'][0]{
                    name,
                    "slug": slug.current,
                    price,
                    slogan,
                    excerpt
                 }
}`);

export const ALL_TEAM_MEMBERS_QUERY = defineQuery(`*[_type == 'teamMember'
 && defined(slug.current)]{
  _id,
  name,
  "imageUrl": imageUrl.asset->url,
  "imageAlt": imageUrl.alt,
  positions[],
 }`);
