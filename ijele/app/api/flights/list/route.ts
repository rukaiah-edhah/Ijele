// pages/api/flights/list/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import getFlightOffers from '@/lib/flight/getFlightOffers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { origin, destination, departureDate, returnDate, adults } = req.query;

  if (!origin || !destination || !departureDate || !returnDate || !adults) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }

  try {
    const flights = await getFlightOffers(
      origin as string,
      destination as string,
      departureDate as string,
      returnDate as string,
      adults as string,
      '10' // Set a maximum number of results
    );

    res.status(200).json({ data: flights });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch flights', details: error.message });
  }
}
