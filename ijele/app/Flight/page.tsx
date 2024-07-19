"use client";

import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';

const FlightPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<string>('1');
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/api/flights/search', {
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate,
          returnDate,
          adults,
        },
      });
      setFlights(response.data.data);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setFlights([]); // Clear the flights list on error
      setError(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Flight Page</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Search Flights</h2>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin airport code"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination airport code"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              placeholder="Enter departure date"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              placeholder="Enter return date"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              placeholder="Enter number of adults"
              className="input input-bordered w-full max-w-xs"
            />
            <button onClick={fetchFlights} className="btn btn-primary mt-2">
              Search
            </button>
          </div>
        </div>

        {flights.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Flights</h2>
            <ul className="list-disc pl-5">
              {flights.map((flight) => (
                <li key={flight.id} className="mb-2">
                  <p>Flight ID: {flight.id}</p>
                  <p>Source: {flight.source}</p>
                  <p>Instant Ticketing Required: {flight.instantTicketingRequired ? 'Yes' : 'No'}</p>
                  <p>Non-Homogeneous: {flight.nonHomogeneous ? 'Yes' : 'No'}</p>
                  <p>One Way: {flight.oneWay ? 'Yes' : 'No'}</p>
                  <p>Is Upsell Offer: {flight.isUpsellOffer ? 'Yes' : 'No'}</p>
                  <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
                  <p>Number of Bookable Seats: {flight.numberOfBookableSeats}</p>
                  {flight.itineraries.map((itinerary: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Itinerary {index + 1}</h3>
                      <p>Duration: {itinerary.duration}</p>
                      <ul className="list-disc pl-5">
                        {itinerary.segments.map((segment: any, idx: number) => (
                          <li key={idx} className="mb-2">
                            <p>Departure: {segment.departure.iataCode} at {segment.departure.at}</p>
                            <p>Arrival: {segment.arrival.iataCode} at {segment.arrival.at}</p>
                            <p>Carrier Code: {segment.carrierCode}</p>
                            <p>Flight Number: {segment.number}</p>
                            <p>Aircraft: {segment.aircraft.code}</p>
                            <p>Operating Carrier: {segment.operating.carrierCode}</p>
                            <p>Duration: {segment.duration}</p>
                            <p>Number of Stops: {segment.numberOfStops}</p>
                            <p>Blacklisted in EU: {segment.blacklistedInEU ? 'Yes' : 'No'}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <h4 className="text-lg font-semibold mb-1">Price</h4>
                  <p>Total: {flight.price.total} {flight.price.currency}</p>
                  <p>Base: {flight.price.base}</p>
                  <ul>
                    {flight.price.fees.map((fee: any, idx: number) => (
                      <li key={idx}>{fee.type}: {fee.amount}</li>
                    ))}
                  </ul>
                  <p>Grand Total: {flight.price.grandTotal}</p>
                  <h4 className="text-lg font-semibold mb-1">Pricing Options</h4>
                  <p>Fare Type: {flight.pricingOptions.fareType.join(', ')}</p>
                  <p>Included Checked Bags Only: {flight.pricingOptions.includedCheckedBagsOnly ? 'Yes' : 'No'}</p>
                  <p>Validating Airline Codes: {flight.validatingAirlineCodes.join(', ')}</p>
                  <h4 className="text-lg font-semibold mb-1">Traveler Pricings</h4>
                  {flight.travelerPricings.map((travelerPricing: any, idx: number) => (
                    <div key={idx} className="mb-4">
                      <p>Traveler ID: {travelerPricing.travelerId}</p>
                      <p>Fare Option: {travelerPricing.fareOption}</p>
                      <p>Traveler Type: {travelerPricing.travelerType}</p>
                      <p>Total Price: {travelerPricing.price.total} {travelerPricing.price.currency}</p>
                      <p>Base Price: {travelerPricing.price.base}</p>
                      <ul>
                        {travelerPricing.fareDetailsBySegment.map((fareDetail: any, idx: number) => (
                          <li key={idx}>
                            <p>Segment ID: {fareDetail.segmentId}</p>
                            <p>Cabin: {fareDetail.cabin}</p>
                            <p>Fare Basis: {fareDetail.fareBasis}</p>
                            <p>Class: {fareDetail.class}</p>
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

        {error && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Error</h2>
            <div className="bg-red-100 p-4 rounded">
              <p>{error.error}</p>
              {error.details?.errors?.map((errDetail: any, index: number) => (
                <div key={index}>
                  <p><strong>{errDetail.title}</strong></p>
                  <p>Code: {errDetail.code}</p>
                  <p>{errDetail.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightPage;