// components/Flight/FlightSelector.tsx
import React from 'react';

interface FlightSelectorProps {
  flights: any[];
  setSelectedFlight: (flight: any) => void;
}

const FlightSelector: React.FC<FlightSelectorProps> = ({ flights, setSelectedFlight }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Flights</h2>
      <ul className="list-disc pl-5">
        {flights.map((flight) => (
          <li key={flight.id} className="mb-2">
            <button
              onClick={() => setSelectedFlight(flight)}
              className="btn btn-secondary mt-2"
            >
              Select Flight
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSelector;
