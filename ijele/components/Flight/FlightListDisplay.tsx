import React from 'react';
import FlightList from '@/components/Flight/FlightList';

interface FlightListDisplayProps {
  flights: any[];
  setSelectedFlight: (flight: any) => void;
}

const FlightListDisplay: React.FC<FlightListDisplayProps> = ({ flights, setSelectedFlight }) => {
  return (
    <div>
      <FlightList flights={flights} />
      <ul className="list-disc pl-5">
        {flights.map((flight) => (
          <li key={flight.id} className="mb-2">
            {/* Flight details here */}
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

export default FlightListDisplay;
