// app/selected-flight-details/page.tsx
"use client";
import { FC } from 'react';
import SelectedFlightDetails from '@/components/Flight/SelectedFlightDetails'; // Adjust the import path as needed
import { useState } from 'react';

const SelectedFlightDetailsPage: FC = () => {
  const [travelerDetails, setTravelerDetails] = useState({
    name: '',
    email: '',
    // other details...
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const onBookFlight = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking flight logic
  };

  const selectedFlight = {
    // Example flight details, replace with actual data
    airline: 'Example Airline',
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
    price: '$100',
  };

  return (
    <div>
      <SelectedFlightDetails
        selectedFlight={selectedFlight}
        travelerDetails={travelerDetails}
        handleInputChange={handleInputChange}
        onBookFlight={onBookFlight}
      />
    </div>
  );
};

export default SelectedFlightDetailsPage;
