import { IoMdChatbubbles } from 'react-icons/io';
import { defineType, defineField, defineArrayMember } from 'sanity';

export const chatBubbleType = defineType({
  name: 'chatBubble',
  title: 'Chat Bubbles',
  icon: IoMdChatbubbles,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Chat Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-chat-bubble`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'messages',
      title: 'Messages Content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'message',
          type: 'object',
          fields: [
            defineField({
              name: 'inbound',
              type: 'string',
              title: 'mns',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'outbound',
              type: 'string',
              title: 'Client',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
