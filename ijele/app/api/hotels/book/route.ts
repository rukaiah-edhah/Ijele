import { NextRequest, NextResponse } from 'next/server';
import bookHotel from '@/lib/hotel/bookHotel';
import { GuestInfo, PaymentInfo } from '../../../../lib/interfaces';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { data } = await request.json();
    if (!data || !data.roomAssociations || !data.payment || !data.guests) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const offerId = data.roomAssociations[0]?.hotelOfferId;
    const guestInfo = data.guests[0];
    const paymentInfo = data.payment;

    if (!offerId || !guestInfo || !paymentInfo) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

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