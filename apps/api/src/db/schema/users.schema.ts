import * as t from 'drizzle-orm/pg-core';
import { timestamps, userRole } from './schema-helper.js';

export const UserTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.text('name').notNull(),
  email: t.text('email').notNull().unique(),
  emailVerified: t.boolean('email_verified').default(false).notNull(),
  image: t.text('image'),
  role: userRole('role').notNull().default('user'),
  banned: t.boolean('banned').default(false),
  banReason: t.text('ban_reason'),
  banExpires: t.timestamp('ban_expires', { withTimezone: true }),
  phone: t.text('phone'),
  companyName: t.text('company_name'),
  position: t.text('position'),
  ...timestamps,
});
