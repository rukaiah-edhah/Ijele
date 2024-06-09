import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const serviceProvidersTable = pgTable('service_providers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  companyName: text('company_name').notNull(),
  serviceType: text('service_type').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type InsertServiceProvider = typeof serviceProvidersTable.$inferInsert;
export type SelectServiceProvider = typeof serviceProvidersTable.$inferSelect;
