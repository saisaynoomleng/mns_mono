import { GrDocumentPerformance } from 'react-icons/gr';
import { defineField, defineType } from 'sanity';

export const capabilityType = defineType({
  name: 'capability',
  icon: GrDocumentPerformance,
  title: 'Capabilities',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.nam}-capability`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
});
