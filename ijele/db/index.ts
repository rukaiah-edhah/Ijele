// This file sets up the database connection and exports the db instance

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString);
export const db = drizzle(client);
