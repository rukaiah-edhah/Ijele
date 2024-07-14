import { NextRequest, NextResponse } from 'next/server';
import createFlightOrder from '@/lib/flight/bookFlight';
import { FlightOrderRequest } from '@/lib/interfaces';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const flightOrderRequest: FlightOrderRequest = await request.json();
    if (!flightOrderRequest.data.flightOffers || !flightOrderRequest.data.travelers) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const orderResponse = await createFlightOrder(flightOrderRequest);
    return NextResponse.json(orderResponse);
  } catch (error: any) {
    console.error('Error creating flight order:', error);
    return NextResponse.json(
      { error: 'Failed to create flight order', details: error.response ? error.response.data : error.message },
      { status: 500 }
    );
  }
}