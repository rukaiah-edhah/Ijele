// components/Flight/SearchForm.tsx
import React from 'react';

type SearchFormProps = {
  onSearch: () => void;
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setDepartureDate: (value: string) => void;
  setReturnDate: (value: string) => void;
  setAdults: (value: number) => void;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
};

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  setOrigin,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setAdults,
  origin,
  destination,
  departureDate,
  returnDate,
  adults,
}) => (
  <div className="search-form">
    {/* Form Fields */}
    <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" />
    <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
    <input value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} placeholder="Departure Date" type="date" />
    <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} placeholder="Return Date" type="date" />
    <input value={adults} onChange={(e) => setAdults(Number(e.target.value))} placeholder="Adults" type="number" />
    <button onClick={onSearch}>Search Flights</button>
  </div>
);

export default SearchForm;
