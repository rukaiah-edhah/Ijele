import getFlightsByAirportCode from "@/lib/flight/getFlightByAirportCode";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const originLocationCode = searchParams.get('originLocationCode'); 
  const destinationLocationCode = searchParams.get('destinationLocationCode');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const adults = searchParams.get('adults');
  const max = searchParams.get('max');

  if (!originLocationCode || !destinationLocationCode || !departureDate || !returnDate || !adults) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const flights = await getFlightsByAirportCode(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      max || '3'
    );
    return NextResponse.json(flights);
  } catch (error: any) {
    console.error('Error fetching flights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flights', details: error.message },
      { status: 500 }
    );
  }
}