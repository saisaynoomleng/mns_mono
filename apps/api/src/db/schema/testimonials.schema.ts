import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { testimonialStatus, timestamps } from './schema-helper.js';

export const TestimonialTable = t.pgTable(
  'testimonials',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' }),
    userNameSnapshot: t
      .varchar('user_name_snapshot', { length: 255 })
      .notNull(),
    title: t.text('title').notNull(),
    status: testimonialStatus('status').notNull().default('new'),
    body: t.text('body').notNull(),
    ...timestamps,
  },
  (table) => [t.index('testimonial_userId_idx').on(table.userId)],
);
