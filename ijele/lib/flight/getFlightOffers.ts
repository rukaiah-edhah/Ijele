import axios from 'axios';
import getAccessToken from '../getAccessToken';
import { FlightDataResponse } from '../interfaces';

/**
 * Function to get flights by airport code from Amadeus API.
 * @param {string} origin - The code of the airport to search flights from.
 * @param {string} destination - The code of the airport to search flights to.
 * @param {string} departureDate - The departure date.
 * @param {string} returnDate - The return date.
 * @param {string} adults - The number of adults.
 * @param {string} max - The maximum number of results.
 * @returns {Promise<FlightDataResponse>} The data of flights.
 * @throws an error if unable to retrieve the flights.
 */
const getFlightOffers = async (
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string,
  adults: string,
  max: string
): Promise<FlightDataResponse> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get<FlightDataResponse>('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        returnDate,
        adults,
        max,
      },
    });

    console.log('Flights retrieved:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error retrieving flights:', error.response.data);
    } else {
      console.error('Error retrieving flights:', error.message);
    }
    throw error; 
  }
};

export default getFlightOffers;