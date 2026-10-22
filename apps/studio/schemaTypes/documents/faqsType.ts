import { RiQuestionnaireLine } from 'react-icons/ri';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const faqsType = defineType({
  name: 'faqs',
  icon: RiQuestionnaireLine,
  type: 'document',
  title: 'FAQs',
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
        source: (doc) => `${doc.name}-faqs`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'faq',
        }),
      ],
    }),
  ],
});
