import { uuid, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users';


export const tripTable = pgTable('trip', {
    tripId: serial('id').primaryKey(),
    // owner_id: uuid('owner').notNull().references(()=> usersTable.userId),
    tripTitle: text('title'),
    location: text('location'),
    description: text('description'),
    tripImage: text('tripImage'),
    people: text('people'),
    accom: text('hotels'),
    transport: text('flights'),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

export type InsertTrip = typeof tripTable.$inferInsert;
export type SelectTrip = typeof tripTable.$inferSelect;

