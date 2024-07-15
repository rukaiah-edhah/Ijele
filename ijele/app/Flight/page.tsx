"use client";

import Navbar from "@/components/Navbar";

import { useState } from 'react';
import axios from 'axios';

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
    <div> <Navbar />
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
                  {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode} -
                  {flight.itineraries[0].segments[0].departure.at} to {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at}
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