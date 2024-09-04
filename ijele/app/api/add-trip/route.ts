import { NextRequest } from 'next/server';
import { db } from '@/db';
import { tripTable, InsertTrip } from '@/db/schemas/trip'; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      owner_id,
      tripTitle,
      location,
      description,
      tripImage,
      people,
      accom,
      transport,
      createdAt // optional: remove if you're generating it here
    } = body;

    const newTrip: InsertTrip = {
      owner_id, 
      tripTitle,
      location,
      description,
      tripImage,
      people,
      accom,
      transport,
      createdAt: createdAt ? new Date(createdAt) : new Date(), // Ensure it's a Date object
    };

    const result = await db.insert(tripTable).values(newTrip).execute();
    // const tripToUser = await db.insert()
    return new Response(JSON.stringify({ message: 'Trip added successfully!', result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error adding trip:', error);
    return new Response(JSON.stringify({ message: 'Failed to add trip', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
