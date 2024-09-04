import axios from 'axios';
import getAccessToken from '../getAccessToken';
import { FlightOrderRequest, FlightOrderResponse } from '../interfaces';

const createFlightOrder = async (flightOrderRequest: FlightOrderRequest): Promise<FlightOrderResponse> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post<FlightOrderResponse>(
      'https://api.amadeus.com/v1/booking/flight-orders',
      flightOrderRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/vnd.amadeus+json',
        },
      }
    );

    console.log('Flight order created:', response.data);

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
