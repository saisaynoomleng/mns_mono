import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { testimonialStatus, timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

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
    rating: t.integer('rating').notNull().default(1),
    status: testimonialStatus('status').notNull().default('new'),
    body: t.text('body').notNull(),
    ...timestamps,
  },
  (table) => [
    t.index('testimonial_userId_idx').on(table.userId),
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);
