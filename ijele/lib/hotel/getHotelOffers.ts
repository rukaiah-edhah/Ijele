import axios from "axios";
import getAccessToken from "../getAccessToken";
import { HotelOffersResponse } from "../interfaces";

/**
 * Function to get hotel offers using Amadeus API.
 * @param {string[]} hotelIds - An array of hotel IDs to search offers for.
 * @param {string} checkInDate - The check-in date in YYYY-MM-DD format.
 * @param {string} checkOutDate - The check-out date in YYYY-MM-DD format.
 * @param {number} adults - The number of adults.
 * @returns {Promise<HotelOffersResponse>} The response data containing hotel offers.
 * @throws Will throw an error if unable to retrieve the hotel offers.
 */
const getHotelOffers = async (
  hotelIds: string[],
  checkInDate: string,
  checkOutDate: string,
  adults: number
): Promise<HotelOffersResponse> => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      'https://test.api.amadeus.com/v3/shopping/hotel-offers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          hotelIds: hotelIds.join(','),
          checkInDate,
          checkOutDate,
          adults,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error retrieving hotel offers:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default getHotelOffers;
