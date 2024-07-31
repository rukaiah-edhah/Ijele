import React, { useState } from 'react';

interface Segment {
  departureTime: string;
  arrivalTime: string;
  stops: string;
  route: string;
  details: string;
}

interface FlightCardProps {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  stops: string;
  price: string;
  route: string;
  logo: string; // Local logo URL
  details: string;
  currency: string;
  segments: Segment[];
}

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  departureTime,
  arrivalTime,
  stops,
  price,
  route,
  logo,
  details,
  currency,
  segments,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  console.log('FlightCard Props:', {
    airline,
    departureTime,
    arrivalTime,
    stops,
    price,
    route,
    logo,
    details,
    currency,
    segments,
  });

  return (
    <div className="flex flex-col mb-4 shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-white">
        <img src={logo} alt={`${airline} logo`} className="w-12 h-12 mr-4" />
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold">{departureTime} - {arrivalTime}</p>
              <p className="text-sm text-gray-500">{stops}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{currency}{price}</p>
              <p className="text-sm text-gray-500">{route}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 bg-ijele_navy">
        <p className="text-sm text-white">{details}</p>
        <button onClick={toggleExpansion} className="text-sm text-ijele_gold focus:outline-none">
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      {isExpanded && (
        <div className="p-4 bg-white border-t">
          {segments.map((segment, index) => (
            <div key={index} className="mb-2">
              <p className="text-sm font-semibold">
                {segment.departureTime} - {segment.arrivalTime}
              </p>
              <p className="text-sm text-gray-500">{segment.route}</p>
              <p className="text-sm text-gray-500">{segment.stops}</p>
              <p className="text-sm text-gray-500">{segment.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightCard;
