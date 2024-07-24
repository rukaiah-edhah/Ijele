import { NextRequest, NextResponse } from 'next/server';
import createFlightOrder from '@/lib/flight/bookFlight';
import { FlightOrderRequest } from '@/lib/interfaces';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const flightOrderRequest: FlightOrderRequest = await request.json();
    console.log('Received booking request:', flightOrderRequest);

    const { flightOffers, travelers } = flightOrderRequest.data;

    if (!flightOffers || !travelers) {
      console.error('Missing required parameters', flightOrderRequest);
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const orderResponse = await createFlightOrder(flightOrderRequest);
    console.log('Order response:', orderResponse);
    return NextResponse.json(orderResponse);
  } catch (error: any) {
    console.error('Error creating flight order:', error);
    return NextResponse.json(
      { error: 'Failed to create flight order', details: error.response ? error.response.data : error.message },
      { status: 500 }
    );
  }
}
