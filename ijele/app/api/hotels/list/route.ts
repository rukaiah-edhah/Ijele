import { NextRequest, NextResponse } from 'next/server';
import getHotelsByCity from '@/lib/hotel/getHotelByCity';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const cityCode = searchParams.get('cityCode') || '';

  if (!cityCode) {
    return NextResponse.json(
      { error: 'Missing required parameter: cityCode' },
      { status: 400 }
    );
  }

  try {
    const hotels = await getHotelsByCity(cityCode);
    return NextResponse.json(hotels);
  } catch (error: any) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch hotels',
        details: error.response ? error.response.data : error.message,
      },
      { status: 500 }
    );
  }
}
