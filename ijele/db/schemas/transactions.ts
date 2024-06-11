import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const transactionsTable = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  transactionDate: timestamp('transaction_date').notNull().defaultNow(),
  status: varchar('status', [50]).notNull(),
});

export type InsertTransaction = typeof transactionsTable.$inferInsert;
export type SelectTransaction = typeof transactionsTable.$inferSelect;
