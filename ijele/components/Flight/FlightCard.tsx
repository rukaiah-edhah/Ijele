import React from 'react';

interface FlightCardProps {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  stops: string;
  price: string;
  route: string;
  logo: string;
  details: string;
  currency: string;
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
}) => {
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
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <p className="text-sm text-gray-500">{details}</p>
        <button className="text-sm text-blue-500 focus:outline-none">▼</button>
      </div>
    </div>
  );
};

export default FlightCard;
