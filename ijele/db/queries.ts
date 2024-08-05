import { db } from '.';
import { InsertUser, usersTable } from './schemas';
import { eq } from 'drizzle-orm';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return result.length > 0 ? result[0] : null;
}