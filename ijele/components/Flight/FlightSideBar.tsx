import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

const FlightSideBar: React.FC<{
  onSearch: (origin: string, destination: string, departureDate: string, returnDate: string, adults: string) => void;
}> = ({ onSearch }) => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<string>('1');

  const handleSearch = () => {
    onSearch(origin, destination, departureDate, returnDate, adults);
  };

  return (
    <div className="w-full md:w-1/4 p-4 bg-ijele_teal rounded-md">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Search Flights</h2>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Enter origin airport code"
          className="input input-bordered w-full mb-2"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination airport code"
          className="input input-bordered w-full mb-2"
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="number"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Number of Adults"
        />
        <button onClick={handleSearch} className="btn btn-primary w-full">
          Search
        </button>
      </div>
    </div>
  );
};

export default FlightSideBar;
