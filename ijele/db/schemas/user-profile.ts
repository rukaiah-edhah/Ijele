import { uuid, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const userProfileTable = pgTable ('user_profile', {
    userId: uuid('user_id').primaryKey(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    tripId: serial('trip_id').notNull()
})

export type InsertTrip = typeof userProfileTable.$inferInsert;
export type SelectTrip = typeof userProfileTable.$inferSelect;
