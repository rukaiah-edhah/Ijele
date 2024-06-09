import { db } from '.';
import { InsertUser, usersTable, InsertServiceProvider, serviceProvidersTable } from './schemas';
import { eq } from 'drizzle-orm';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createServiceProvider(data: InsertServiceProvider) {
  await db.insert(serviceProvidersTable).values(data);
}

export async function getUserByEmail(email: string) {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function getServiceProviderByUserId(userId: number) {
  return db.select().from(serviceProvidersTable).where(eq(serviceProvidersTable.userId, userId));
}

