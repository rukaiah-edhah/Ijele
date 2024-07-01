import axios from 'axios'; 
import getAccessToken from '../getAccessToken'; 
import { FlightDataResponse } from '../interfaces';

const FlightOfferSearch: any[] flights: any(String origin, String destination, String departDate, String adults, String returnDate) throws ResponseException {
    return amadeus.shopping.flightOffersSearch.get(
              Params.with("originLocationCode", origin)
                      .and("destinationLocationCode", destination)
                      .and("departureDate", departDate)
                      .and("returnDate", returnDate)
                      .and("adults", adults)
                      .and("max", 3));
}