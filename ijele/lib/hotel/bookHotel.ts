import axios from 'axios';
import getAccessToken from '../getAccessToken';
import { GuestInfo, PaymentInfo, BookingResponse } from '../interfaces';

/**
 * Function to book a hotel using Amadeus API.
 * @param {string} offerId - The offer ID of the hotel booking.
 * @param {GuestInfo} guestInfo - Information about the guest.
 * @param {PaymentInfo} paymentInfo - Information about the payment.
 * @returns {Promise<BookingResponse>} The response data from the booking.
 * @throws an error if unable to book the hotel.
 */
const bookHotel = async (offerId: string, guestInfo: GuestInfo, paymentInfo: PaymentInfo): Promise<BookingResponse> => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post<BookingResponse>('https://test.api.amadeus.com/v1/booking/hotel-bookings', {
      offerId,
      guests: [guestInfo],
      payments: [paymentInfo],
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Booking confirmation:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error booking hotel:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default bookHotel;
