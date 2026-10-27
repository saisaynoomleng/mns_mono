import { toTitleCase } from '@mns/utils';
import { FaUserGear } from 'react-icons/fa6';
import { defineType, defineField } from 'sanity';

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Members',
  icon: FaUserGear,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Member name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-team-member`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'positions',
      title: 'Member positions',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      position: 'positions.0',
      image: 'imageUrl',
    },
    prepare({ name, position, image }) {
      const formatName = name ? toTitleCase(name) : 'Member name not provided';
      const formatPosition = position
        ? toTitleCase(position)
        : 'Position not specified';

      return {
        title: formatName,
        subtitle: `Position: ${formatPosition}`,
        media: image ?? FaUserGear,
      };
    },
  },
});
