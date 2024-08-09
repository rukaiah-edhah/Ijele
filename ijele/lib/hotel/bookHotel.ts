import axios from 'axios';
import getAccessToken from '../getAccessToken';
import { GuestInfo, PaymentInfo, BookingResponse, BookingRequest, HotelOffer } from '../interfaces';
import { useCart } from '@/components/Payment/cartContent';


const bookHotel = async (offerId: string, guestInfo: GuestInfo, paymentInfo: PaymentInfo, hotelOffer: HotelOffer): Promise<BookingResponse> => {
  const { addToCart } = useCart();

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

    // Convert the id to a string or use a default value if undefined/null
    const hotelId = hotelOffer.hotel.hotelId?.toString() || 'default-hotel-id';

    // Add the hotel to the cart
    addToCart({
      id: hotelId, // Ensure it's a string
      type: 'hotel',
      details: hotelOffer,
      price: parseFloat(hotelOffer.offers[0].price.total), // Replace with actual price
    });

    return response.data;
  } catch (error: any) {
    console.error('Error booking hotel:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default bookHotel;
