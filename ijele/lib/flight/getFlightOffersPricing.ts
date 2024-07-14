import axios from "axios";
import getAccessToken from "../getAccessToken";
import { FlightOffersPrice } from "../interfaces";
import getFlightOffers from "./getFlightOffers";

/**
 * Function to get flight offers pricing from Amadeus API.
 * @returns {Promise<FlightOffersPrice>} The pricing data of flights.
 * @throws an error if unable to retrieve the flight offers pricing.
 */
const getFlightOffersPrice = async (
  getFlightOffers: any[]
): Promise<FlightOffersPrice> => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post<FlightOffersPrice>(
      "https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?forceClass=false",
      {
        data: {
          type: "flight-offers-pricing",
          flightOffers: getFlightOffers,
        },
      }, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
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
    } else {
      console.error("Error retrieving flight offers pricing:", error.message);
    }
    throw error;
  }
};

export default getFlightOffersPrice;
