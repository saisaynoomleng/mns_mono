import { defineArrayMember, defineField, defineType } from 'sanity';
import { toTitleCase } from '@mns/utils';
import { CiLink } from 'react-icons/ci';
import {
  MdOutlineQuestionAnswer,
  MdOutlineVideoCameraFront,
} from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { PiTextColumnsBold } from 'react-icons/pi';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      validation: (rule) =>
        rule.required().info(`Alternative Text is required for screen reader`),
      type: 'string',
    }),
  ],
});

export const blockContent = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'B', value: 'strong' },
          { title: 'I', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
      lists: [{ title: 'Bullet', value: 'bullet' }],
    }),
    defineArrayMember({
      type: 'imageWithAlt',
    }),
  ],
});

export const seo = defineType({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

export const socialLink = defineType({
  name: 'socialLink',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      name: 'platform',
    },
    prepare({ name }) {
      const formatName = name ? toTitleCase(name) : 'Platform not provided';

      return {
        title: formatName,
        media: CiLink,
      };
    },
  },
});

export const faq = defineType({
  name: 'faq',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      const formatTitle = title ? toTitleCase(title) : 'Title not provided';

      return {
        title: formatTitle,
        media: MdOutlineQuestionAnswer,
      };
    },
  },
});

export const videoEmbedded = defineType({
  name: 'videoEmbedded',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'videoId',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({ label }) {
      const formatLabel = label ? toTitleCase(label) : 'Label not provided';

      return {
        title: formatLabel,
        media: MdOutlineVideoCameraFront,
      };
    },
  },
});

export const navLink = defineType({
  name: 'navLink',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'href',
      type: 'string',
    }),
    defineField({
      name: 'isButton',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isExternal',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'label',
    },
    prepare({ name }) {
      const formatName = name ? toTitleCase(name) : 'Label not provided';

      return {
        title: formatName,
        media: CiLink,
      };
    },
  },
});

export const navDropdown = defineType({
  name: 'navDropdown',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'href',
      type: 'string',
    }),
    defineField({
      name: 'dropdownLinks',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'dropdownGroup',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
            }),
            defineField({
              name: 'links',
              type: 'array',
              of: [defineArrayMember({ type: 'navLink' })],
            }),
          ],
          preview: {
            select: {
              label: 'label',
            },
            prepare({ label }) {
              const formatLabel = label
                ? toTitleCase(label)
                : 'Label not provided';
              return {
                title: formatLabel,
                media: CiLink,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({ label }) {
      const formatLabel = label ? toTitleCase(label) : 'Label not provided';
      return {
        title: formatLabel,
        media: RxDropdownMenu,
      };
    },
  },
});

export const footerColumn = defineType({
  name: 'footerColumn',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              name: 'label',
            },
            prepare({ name }) {
              const formatName = name
                ? toTitleCase(name)
                : 'Label not provided';

              return {
                title: formatName,
                media: CiLink,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      const formatTitle = title ? toTitleCase(title) : 'Title not provided';

      return {
        title: formatTitle,
        media: PiTextColumnsBold,
      };
    },
  },
});
