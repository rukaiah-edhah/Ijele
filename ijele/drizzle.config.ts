import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schemas/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  out: './drizzle'
} satisfies Config;
