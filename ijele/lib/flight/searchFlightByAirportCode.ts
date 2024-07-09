import axios from 'axios'; 
import getAccessToken from '../getAccessToken'; 
import { FlightDataResponse } from '../interfaces';
import { FlightData } from 'next/dist/server/app-render/types';

/**
 * Function to get flights by airport code from Amadeus API.
 * @param {string} originLocationCode - The code of the airport to search flights from.
 * @returns {Promise<FlightDataResponse>} The data of flights.
 * @throws an error if unable to retrieve the flights.
 */
const getFlightsByAirportCode = async (originLocationCode: string, destination: string, departureDate: string, returnDate: string, adults: string, max: string): Promise<FlightDataResponse> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get<FlightDataResponse>('https://test.api.amadeus.com/v2/shopping/flight-offers?', {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
      params: {
        origin,
        destination,
        departureDate,
        returnDate,
        adults,
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

export default getFlightsByAirportCode; 
