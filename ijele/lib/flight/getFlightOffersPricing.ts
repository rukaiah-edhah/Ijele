import axios from "axios";
import getAccessToken from "../getAccessToken";
import { FlightOffersPrice } from "../interfaces";

/**
 * Function to get flight offers pricing from Amadeus API.
 * @param {object} flightOffersData - The flight offers data to be priced.
 * @returns {Promise<FlightOffersPrice>} The pricing data of flights.
 * @throws an error if unable to retrieve the flight offers pricing.
 */
const getFlightOffersPrice = async (
  flightOffersData: object
): Promise<FlightOffersPrice> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post<FlightOffersPrice>(
      "https://api.amadeus.com/v1/shopping/flight-offers/pricing?forceClass=false",
      flightOffersData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-HTTP-Method-Override": "GET", // Include this header (required parameter) to override the POST method.
        },
      }
    );

    console.log("Flight price retrieved:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Error retrieving flight offers pricing:",
        error.response.data
      );
      throw new Error(
        `Error ${error.response.status}: ${error.response.data.detail}`
      );
    } else {
      console.error("Error retrieving flight offers pricing:", error.message);
      throw new Error(error.message);
    }
  }
};

export default getFlightOffersPrice;