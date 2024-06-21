import { NextRequest, NextResponse } from 'next/server';
import bookHotel from '@/lib/hotel/bookHotel';
import { GuestInfo, PaymentInfo } from '../../../../lib/interfaces';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { offerId, guestInfo, paymentInfo } = await request.json();

  if (
    !offerId ||
    typeof offerId !== 'string' ||
    !guestInfo ||
    !paymentInfo
  ) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const bookingConfirmation = await bookHotel(offerId, guestInfo as GuestInfo, paymentInfo as PaymentInfo);
    return NextResponse.json(bookingConfirmation);
  } catch (error: any) {
    console.error('Error booking hotel:', error);
    return NextResponse.json(
      { error: 'Failed to book hotel', details: error.response ? error.response.data : error.message },
      { status: 500 }
    );
  }
}
