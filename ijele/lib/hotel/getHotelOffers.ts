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
): Promise<HotelOffersResponse[]> => {
  const accessToken = await getAccessToken();
  const availableHotelOffers: HotelOffersResponse[] = [];

  for (const hotelId of hotelIds) {
    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v3/shopping/hotel-offers",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            hotelIds: hotelId,
            checkInDate,
            checkOutDate,
            adults,
          },
        }
      );

      if (response.data.data && response.data.data.length > 0) {
        availableHotelOffers.push(response.data);
      }
    } catch (error: any) {
      const errorDetails = error.response
        ? error.response.data.errors
        : error.message;
      console.error(
        `Error retrieving hotel offers for hotel ID ${hotelId}:`,
        errorDetails
      );

      if (
        errorDetails.some(
          (err: any) =>
            err.code === 10604 ||
            err.code === 1257 ||
            err.code === 3664 ||
            err.code === 3494
        )
      ) {
        continue;
      }

      throw error;
    }
  }

  return availableHotelOffers;
};

export default getHotelOffers;
