import axios from 'axios'; 
import getAccessToken from '../getAccessToken'; 
import { HotelDataResponse } from '../interfaces';

/**
 * Function to get hotels by city code from Amadeus API.
 * @param {string} cityCode - The code of the city to search hotels in.
 * @returns {Promise<HotelDataResponse>} The data of hotels.
 * @throws an error if unable to retrieve the hotels.
 */
const getHotelsByCity = async (cityCode: string): Promise<HotelDataResponse> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get<HotelDataResponse>('https://api.amadeus.com/v1/reference-data/locations/hotels/by-city', {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
      params: {
        cityCode, 
      },
    });

    console.log('Hotels retrieved:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error retrieving hotels:', error.response.data);
    } else {
      console.error('Error retrieving hotels:', error.message);
    }
    throw error; 
  }
};

export default getHotelsByCity; 
