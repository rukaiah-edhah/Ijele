import axios from 'axios';
import getAccessToken from '../getAccessToken';
import { FlightOrderRequest, FlightOrderResponse } from '../interfaces';

/**
 * Function to create a flight order using Amadeus API.
 * @param {FlightOrderRequest} flightOrderRequest - The request data for creating a flight order.
 * @returns {Promise<FlightOrderResponse>} The response data from the flight order creation.
 * @throws an error if unable to create the flight order.
 */
const createFlightOrder = async (flightOrderRequest: FlightOrderRequest): Promise<FlightOrderResponse> => {
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