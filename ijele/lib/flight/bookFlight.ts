import axios from 'axios';
import getAccessToken from '../getAccessToken';
import { FlightOrderRequest, FlightOrderResponse, Flight } from '../interfaces';
import { useCart } from '@/components/Payment/cartContent';

const createFlightOrder = async (flightOrderRequest: FlightOrderRequest, flightDetails: Flight): Promise<FlightOrderResponse> => {
  const { addToCart } = useCart();

  try {
    const accessToken = await getAccessToken();

    const response = await axios.post<FlightOrderResponse>(
      'https://test.api.amadeus.com/v1/booking/flight-orders',
      flightOrderRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/vnd.amadeus+json',
        },
      }
    );

    console.log('Flight order created:', response.data);

    // Convert the id to a string or use a default value if undefined/null
    const flightId = flightDetails.id?.toString() || 'default-flight-id';

    // Add the flight to the cart
    addToCart({
      id: flightId, // Ensure it's a string
      type: 'flight',
      details: flightDetails,
      price: parseFloat(response.data.data.queuingOfficeId), // Replace with actual price
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error creating flight order:', error.response.data);
    } else {
      console.error('Error creating flight order:', error.message);
    }
    throw error;
  }
};

export default createFlightOrder;
