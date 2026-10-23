import { toTitleCase } from '@mns/utils';
import { AiFillAppstore } from 'react-icons/ai';
import { defineType, defineField } from 'sanity';

export const appsType = defineType({
  name: 'app',
  icon: AiFillAppstore,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'liveUrl',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'demoUrl',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Health Care', value: 'health-care' },
          { title: 'Retail & Commerce', value: 'retail-and-commerce' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Creative & Media', value: 'creative-and-media' },
          { title: 'Generic', value: 'generic' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'generic',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Test', value: 'test' },
          { title: 'Production', value: 'production' },
          { title: 'Development', value: 'development' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'development',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Application Detail',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isMyanmarOnly',
      title: 'Only Available in Myanmar?',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      status: 'status',
      image: 'imageUrl',
    },
    prepare({ name, type, status, image }) {
      const formatName = name ? toTitleCase(name) : 'App name not provided';
      const formatType = type ? toTitleCase(type) : 'App type not specified';
      const formatStatus = status
        ? toTitleCase(status)
        : 'App status not specified';

      return {
        title: `${formatName}`,
        subtitle: `Status: ${formatStatus} | Type: ${formatType}`,
        media: image ?? AiFillAppstore,
      };
    },
  },
});
