// Flight Search API

import { NextRequest, NextResponse } from "next/server";
import getFlightOffers from "@/lib/Flight/getFlightOffers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hotelIdsParam = searchParams.get('hotelIds');
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const adults = searchParams.get('adults');

  if (!hotelIdsParam || !checkInDate || !checkOutDate || !adults) {
    return NextResponse.json(
      { error: 'Missing required parameters', details: { hotelIdsParam, checkInDate, checkOutDate, adults } },
      { status: 400 }
    );
  }

  const hotelIds = hotelIdsParam.split(',');

  try {
    const hotelOffers = await getHotelOffers(
      hotelIds,
      checkInDate,
      checkOutDate,
      parseInt(adults)
    );
    return NextResponse.json(hotelOffers);
  } catch (error: any) {
    console.error('Error fetching hotel offers:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch hotel offers',
        details: error.response ? error.response.data : error.message,
      },
      { status: 500 }
    );
  }
}