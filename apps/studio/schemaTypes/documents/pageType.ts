import { toTitleCase } from '@mns/utils';
import { PiTextAlignJustifyFill } from 'react-icons/pi';
import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  icon: PiTextAlignJustifyFill,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: (doc) => `${doc.name}-page`,
      },
    }),
    defineField({
      name: 'type',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main', value: 'main' },
          { title: 'Utility', value: 'utility' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      hidden: ({ document }) => {
        return document?.type === 'main';
      },
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
    },
    prepare({ name, type }) {
      const formatName = name ? toTitleCase(name) : 'Page name not provided';
      const formatType = type ? toTitleCase(type) : 'Page type not specified';

      return {
        title: formatName,
        subtitle: formatType,
        media: PiTextAlignJustifyFill,
      };
    },
  },
});
