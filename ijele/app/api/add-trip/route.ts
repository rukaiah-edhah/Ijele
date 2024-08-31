import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { tripTable, InsertTrip } from '@/db/schemas/trip'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        owner_id,
        tripTitle,
        location,
        description,
        tripImage,
        people,
        accom,
        transport,
      } = req.body;

      const newTrip: InsertTrip = {
        owner_id, 
        tripTitle,
        location,
        description,
        tripImage,
        people,
        accom,
        transport,
        createdAt: new Date(), 
      };

      const result = await db.insert(tripTable).values(newTrip).execute();

      res.status(200).json({ message: 'Trip added successfully!', result });
    } catch (error: any) {
      console.error('Error adding trip:', error);
      res.status(500).json({ message: 'Failed to add trip', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}