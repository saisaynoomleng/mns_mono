import { toTitleCase } from '@mns/utils';
import { MdWorkspaces } from 'react-icons/md';
import { defineType, defineField } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  icon: MdWorkspaces,
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
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slogan',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'imageUrl',
    },
    prepare({ name, image }) {
      const formatName = name ? toTitleCase(name) : 'Service name not provided';

      return {
        title: formatName,
        media: image ?? MdWorkspaces,
      };
    },
  },
});
