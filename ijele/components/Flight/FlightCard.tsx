import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

  return (
    <div className="flex flex-col mb-4 shadow-lg overflow-hidden rounded-tr-[25%] border bg-ijele_navy">
      <div className="flex items-center p-4 bg-white border-black">
        <img src={logo} alt={`${airline} logo`} className="w-12 h-12 mr-4 rounded-full border" />
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-junge">{departureTime} - {arrivalTime}</p>
            </div>
            
            <div>
              <p className="flex-1 text-center text-sm text-gray-500 font-junge">{stops}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500"><i className="fa-solid fa-suitcase-rolling"></i></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-ijele_navy">
        <div className="flex-1 text-left">
          <p className="text-sm text-ijele_lightTeal font-kite_one italic">{airline}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm text-ijele_lightTeal font-kite_one italic">{route}</p>
        </div>
        <div className="flex-1 text-right">
          <p className="text-lg text-white font-inter">{currency}{price}</p>
        </div>
        <button onClick={toggleExpansion} className="text-sm text-ijele_gold focus:outline-none ml-4">
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
