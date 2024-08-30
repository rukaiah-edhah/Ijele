import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';


export const tripTable = pgTable('trip', {
    tripId: serial('trip_id').primaryKey(),
    tripTitle: text('title'),
    location: text('location'),
    description: text('description'),
    tripImage: text('tripImage'),
    people: text('people'),
    accom:
    transport:
    createdAt: timestamp('created_at').notNull().defaultNow(),
    owner_id:
})

// public.trip (
//     "tripId" uuid not null default gen_random_uuid (),
//     "tripTitle" text null default ''::text,
//     location text[] null default '{""}'::text[],
//     description text null default ''::text,
//     "tripImage" text null,
//     people text[] null,
//     accom json[] null,
//     transport json[] null,
//     created_at timestamp with time zone not null default now(),
//     owner_id text null,
//     constraint trip_pkey primary key ("tripId"),
//     constraint trip_owner_id_key unique (owner_id),
//     constraint trip_owner_id_fkey foreign key (owner_id) references user_profile (user_id)
//   ) tablespace pg_default;
// No file chosen
