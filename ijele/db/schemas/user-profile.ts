import { uuid, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import { sql } from 'drizzle-orm';

export const userProfileTable = pgTable ('user_profile', {
    userId: uuid('user_id').primaryKey(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    tripId: text('trip_id').array().notNull().default(sql`'{}'::text[]`),
})

export type InsertTrip = typeof userProfileTable.$inferInsert;
export type SelectTrip = typeof userProfileTable.$inferSelect;
