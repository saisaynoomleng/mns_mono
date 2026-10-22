import { GiGearHammer } from 'react-icons/gi';
import { defineType, defineField, defineArrayMember } from 'sanity';

export const siteSettingType = defineType({
  name: 'siteSetting',
  icon: GiGearHammer,
  type: 'document',
  groups: [
    { title: 'Branding', name: 'branding' },
    { title: 'Navigation', name: 'navigation' },
    { title: 'Footer', name: 'footer' },
  ],
  fields: [
    // branding
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'primaryLogo',
      title: 'Primary Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'secondaryLogo',
      title: 'Secondary Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'branding',
    }),

    // navigation
    defineField({
      name: 'navigation',
      title: 'Navigation Menu links',
      group: 'navigation',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'navLink',
        }),
      ],
    }),

    // footer
    defineField({
      name: 'footerText',
      type: 'text',
      group: 'footer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerColumns',
      type: 'array',
      of: [{ type: 'footerColumn' }],
      group: 'footer',
    }),
    defineField({
      name: 'contactInfo',
      group: 'footer',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          type: 'email',
        }),
        defineField({
          name: 'street',
          type: 'string',
        }),
        defineField({
          name: 'zip',
          type: 'string',
        }),
        defineField({
          name: 'city',
          type: 'string',
        }),
        defineField({
          name: 'country',
          type: 'string',
        }),
        defineField({
          name: 'state',
          type: 'string',
        }),
        defineField({
          name: 'lat',
          type: 'number',
        }),
        defineField({
          name: 'long',
          type: 'number',
        }),
      ],
    }),
  ],
});
