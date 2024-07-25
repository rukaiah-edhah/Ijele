
import React from 'react';
import styles from './FlightList.module.css'; 

type Flight = {
  id: string;
  numberOfBookableSeats: number;
  itineraries: Array<{
    duration: string;
    segments: Array<{
      departure: { iataCode: string; at: string };
      arrival: { iataCode: string; at: string };
      carrierCode: string;
      number: string;
      aircraft: { code: string };
      operating?: { carrierCode: string };
      duration: string;
      numberOfStops: number;
    }>;
  }>;
  price: {
    total: string;
    currency: string;
    base: string;
    grandTotal: string;
  };
  pricingOptions: {
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: Array<{
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: {
      total: string;
      currency: string;
      base: string;
    };
    fareDetailsBySegment: Array<{
      cabin: string;
      includedCheckedBags?: { quantity: number };
    }>;
  }>;
};

type Props = {
  flights: Flight[];
};

const FlightList: React.FC<Props> = ({ flights }) => {
  return (
    <div className={styles.flightList}>
      {flights.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Flights</h2>
          <ul className="list-disc pl-5">
            {flights.map((flight) => (
              <li key={flight.id} className="mb-6 p-4 bg-white shadow-md rounded-lg border border-black">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Flight ID: {flight.id}</h3>
                  <p>Number of Bookable Seats: {flight.numberOfBookableSeats}</p>
                </div>
                {flight.itineraries.map((itinerary, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Itinerary {index + 1}</h4>
                    <p>Duration: {itinerary.duration}</p>
                    <ul className="list-disc pl-5">
                      {itinerary.segments.map((segment, idx) => (
                        <li key={idx} className="mb-2">
                          <p>Departure: {segment.departure.iataCode} at {segment.departure.at}</p>
                          <p>Arrival: {segment.arrival.iataCode} at {segment.arrival.at}</p>
                          <p>Carrier Code: {segment.carrierCode}</p>
                          <p>Flight Number: {segment.number}</p>
                          <p>Aircraft: {segment.aircraft.code}</p>
                          <p>Operating Carrier: {segment.operating ? segment.operating.carrierCode : 'N/A'}</p>
                          <p>Duration: {segment.duration}</p>
                          <p>Number of Stops: {segment.numberOfStops}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <h4 className="text-lg font-semibold mb-1">Price</h4>
                <p>Total: {flight.price.total} {flight.price.currency}</p>
                <p>Base: {flight.price.base}</p>
                <p>Grand Total: {flight.price.grandTotal}</p>
                <h4 className="text-lg font-semibold mb-1">Pricing Options</h4>
                <p>Included Checked Bags Only: {flight.pricingOptions.includedCheckedBagsOnly ? 'Yes' : 'No'}</p>
                <p>Validating Airline Codes: {flight.validatingAirlineCodes.join(', ')}</p>
                <h4 className="text-lg font-semibold mb-1">Traveler Pricings</h4>
                {flight.travelerPricings.map((travelerPricing, idx) => (
                  <div key={idx} className="mb-4">
                    <p>Traveler ID: {travelerPricing.travelerId}</p>
                    <p>Fare Option: {travelerPricing.fareOption}</p>
                    <p>Traveler Type: {travelerPricing.travelerType}</p>
                    <p>Total Price: {travelerPricing.price.total} {travelerPricing.price.currency}</p>
                    <p>Base Price: {travelerPricing.price.base}</p>
                    <ul>
                      {travelerPricing.fareDetailsBySegment.map((fareDetail, idx) => (
                        <li key={idx}>
                          <p>Cabin: {fareDetail.cabin}</p>
                          <p>Included Checked Bags: {fareDetail.includedCheckedBags ? fareDetail.includedCheckedBags.quantity : 'N/A'}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightList;
