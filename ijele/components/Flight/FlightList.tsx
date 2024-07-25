import React, { useState } from 'react';
import '@/components/Flight/flightList.css';

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
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);

  const handleExpandToggle = (flightId: string) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Basic date format
  };

  return (
    <div className="flights-container">
      {flights.length > 0 && (
        <div>
          <h2 className="flights-title">Flights</h2>
          <ul className="flights-list">
            {flights.map((flight) => (
              <li key={flight.id} className="flight-item">
                <div className="flight-header">
                  <h3 className="flight-id">Flight ID: {flight.id}</h3>
                  <p>Number of Bookable Seats: {flight.numberOfBookableSeats}</p>
                </div>
                <div className="flight-details">
                  <p>Carrier Code: {flight.itineraries[0]?.segments[0]?.carrierCode}</p>
                  <p>Departure: {flight.itineraries[0]?.segments[0]?.departure.iataCode} at {formatDate(flight.itineraries[0]?.segments[0]?.departure.at)}</p>
                  <p>Arrival: {flight.itineraries[0]?.segments[0]?.arrival.iataCode} at {formatDate(flight.itineraries[0]?.segments[0]?.arrival.at)}</p>
                  <p>Price: {flight.price.total} {flight.price.currency}</p>
                </div>
                {expandedFlight === flight.id && (
                  <div className="expandable-content visible">
                    {flight.itineraries.map((itinerary, index) => (
                      <div key={index} className="itinerary">
                        <h4>Itinerary {index + 1}</h4>
                        <p>Duration: {itinerary.duration}</p>
                        <ul>
                          {itinerary.segments.map((segment, idx) => (
                            <li key={idx}>
                              <p>Departure: {segment.departure.iataCode} at {formatDate(segment.departure.at)}</p>
                              <p>Arrival: {segment.arrival.iataCode} at {formatDate(segment.arrival.at)}</p>
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
                    <h4>Price Details</h4>
                    <p>Total: {flight.price.total} {flight.price.currency}</p>
                    <p>Base: {flight.price.base}</p>
                    <p>Grand Total: {flight.price.grandTotal}</p>
                    <h4>Pricing Options</h4>
                    <p>Included Checked Bags Only: {flight.pricingOptions.includedCheckedBagsOnly ? 'Yes' : 'No'}</p>
                    <p>Validating Airline Codes: {flight.validatingAirlineCodes.join(', ')}</p>
                    <h4>Traveler Pricing</h4>
                    {flight.travelerPricings.map((travelerPricing, idx) => (
                      <div key={idx}>
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
                  </div>
                )}
                <button className="expand-button" onClick={() => handleExpandToggle(flight.id)}>
                  {expandedFlight === flight.id ? 'Show Less' : 'Show More'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightList;
