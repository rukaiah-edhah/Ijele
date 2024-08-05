import { db } from '.';
import { InsertUser, usersTable } from './schemas';
import { eq } from 'drizzle-orm';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserByEmail(email: string) {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}