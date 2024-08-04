import React, { useState } from 'react';

interface SearchFlightFormProps {
  fetchFlights: () => void;
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setDepartureDate: (value: string) => void;
  setReturnDate: (value: string) => void;
  setAdults: (value: string) => void;
}

const SearchFlightForm: React.FC<SearchFlightFormProps> = ({ fetchFlights, setOrigin, setDestination, setDepartureDate, setReturnDate, setAdults }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Search Flights</h2>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Enter origin airport code"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination airport code"
          className="input input-bordered w-full max-w-xs"
        />
        <label>Enter departure date</label>
        <input
          type="date"
          onChange={(e) => setDepartureDate(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Enter return date</label>
        <input
          type="date"
          onChange={(e) => setReturnDate(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Enter number of Adults</label>
        <input
          type="number"
          onChange={(e) => setAdults(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={fetchFlights} className="btn btn-primary mt-2">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFlightForm;
