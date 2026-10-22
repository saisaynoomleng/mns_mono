import { toTitleCase } from '@mns/utils';
import { MdOutlineDesignServices } from 'react-icons/md';
import { defineType, defineField } from 'sanity';

export const portfolioType = defineType({
  name: 'portfolio',
  icon: MdOutlineDesignServices,
  title: 'Portfolios',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Portfolio Name',
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
      name: 'type',
      title: 'Porfolio Type',
      type: 'string',
      options: {
        list: [
          { title: 'Health Care', value: 'health-care' },
          { title: 'Retail & Commerce', value: 'retail-and-commerce' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Creative & Media', value: 'creative-and-media' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startedAt',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endedAt',
      type: 'date',
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
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previewUrl',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      image: 'imageUrl',
    },
    prepare({ name, image, type }) {
      const formatName = name
        ? toTitleCase(name)
        : 'Portfolio name not provided';
      const formatType = type
        ? toTitleCase(type)
        : 'Portfolio type not specified';

      return {
        title: formatName,
        subtitle: `Type: ${formatType}`,
        media: image ?? MdOutlineDesignServices,
      };
    },
  },
});
