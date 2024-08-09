import axios from 'axios';
import getAccessToken from '../getAccessToken';
import { GuestInfo, PaymentInfo, BookingResponse, BookingRequest } from '../interfaces';
import useCart from '@/components/Payment/cartContent';

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
    const bookingRequest: BookingRequest = {
      data: {
        type: 'hotel-order',
        guests: [guestInfo],
        travelAgent: {
          contact: {
            email: guestInfo.email,
          },
        },
        roomAssociations: [
          {
            guestReferences: [{ guestReference: '1' }],
            hotelOfferId: offerId,
          },
        ],
        payment: paymentInfo,
      },
    };

    const response = await axios.post<BookingResponse>('https://test.api.amadeus.com/v2/booking/hotel-orders', bookingRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/vnd.amadeus+json',
      },
    });
    console.log('Booking confirmation:', response.data);

    // Add hotel booking to the cart
    const { addToCart } = useCart(); // Use the useCart hook
    addToCart({
      id: offerId,
      type: 'hotel',
      details: response.data.data,  // Add the booking details
      price: response.data.data.offer.price.total, // Assuming the price is here
    });

    return response.data;
  } catch (error: any) {
    console.error('Error booking hotel:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default bookHotel;