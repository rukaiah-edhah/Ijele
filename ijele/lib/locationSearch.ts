import axios from "axios";
import getAccessToken from "./getAccessToken";
import { LocationSearchResponse, LocationData } from "./interfaces";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // This line ignores certificate errors (not safe for production). We will fix this later.

/**
 * Function to search for locations using Amadeus API.
 * @param {string} query - The search query string.
 * @returns {Promise<LocationData[]>} The response data containing location suggestions.
 * @throws Will throw an error if unable to retrieve the location suggestions.
 */
const locationSearch = async (query: string): Promise<LocationData[]> => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get<LocationSearchResponse>(
      "https://test.api.amadeus.com/v1/reference-data/locations",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          keyword: query,
          subType: "CITY",
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    console.error(
      "Error retrieving location suggestions:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default locationSearch;
