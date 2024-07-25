import React from 'react';
import FlightCard from './FlightCard';

const flights = [
  {
    airline: 'Southwest',
    departureTime: '8:21AM',
    arrivalTime: '9:05AM',
    stops: 'Non-stop',
    price: '203',
    route: 'PIT-ORD',
    logo: '/Images/SW.png',
    details: '',
    currency: '$',
  },
  {
    airline: 'American',
    departureTime: '8:21AM',
    arrivalTime: '9:05AM',
    stops: '1-stop',
    price: '204',
    route: 'PIT-ORD',
    logo: '/Images/AA.png',
    details: '1hr 40min layover - Atlanta (ATL)',
    currency: '$',
  },
  {
    airline: 'Delta',
    departureTime: '8:21AM',
    arrivalTime: '9:05AM',
    stops: 'Non-stop',
    price: '180',
    route: 'PIT-MDW',
    logo: '/Images/Delta.png',
    details: '',
    currency: '$',
  },
];

const FlightDetails: React.FC = () => {
  return (
    <div className="space-y-4">
      {flights.map((flight, index) => (
        <FlightCard key={index} {...flight} />
      ))}
    </div>
  );
};

export default FlightDetails;
