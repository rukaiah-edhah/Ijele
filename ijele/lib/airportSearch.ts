import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";
import getAccessToken from "./getAccessToken";
import { AirportSearchResponse, AirportData } from "./interfaces";

// still not sure why this endpoint requires us to explicitly include the CA certificates
const ca = fs.readFileSync(path.resolve(process.cwd(), 'ca-certificates.pem'));

/**
 * Function to search for airports using Amadeus API.
 * @param {string} query - The search query string.
 * @returns {Promise<AirportData[]>} The response data containing airport suggestions.
 * @throws Will throw an error if unable to retrieve the airport suggestions.
 */
const airportSearch = async (query: string): Promise<AirportData[]> => {
  try {
    const accessToken = await getAccessToken();
    const httpsAgent = new https.Agent({
      ca: ca,
    });
    const response = await axios.get<AirportSearchResponse>(
      "https://test.api.amadeus.com/v1/reference-data/locations",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          keyword: query,
          subType: "AIRPORT",
        },
        httpsAgent: httpsAgent,
      }
    );
    return response.data.data;
  } catch (error: any) {
    console.error(
      "Error retrieving airport suggestions:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default airportSearch;
