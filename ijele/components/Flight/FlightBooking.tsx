// pages/booking.tsx
import { TravelerDetails } from '@/lib/interfaces';
import React, { useState } from 'react';
import TravelerDetailsForm from './TravelerDetailsForm';


const BookingPage: React.FC = () => {
  const [travelerDetails, setTravelerDetails] = useState<TravelerDetails>({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    deviceType: '',
    countryCallingCode: '',
    number: '',
    dateOfBirth: '',
    documentType: '',
    birthPlace: '',
    issuanceLocation: '',
    issuanceDate: '',
    passportNumber: '',
    passportExpiryDate: '',
    passportIssuanceCountry: '',
    validityCountry: '',
    nationality: '',
    holder: true,
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission, e.g., send the details to the server
    console.log('Booking details:', travelerDetails);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Book Your Flight</h1>
      <TravelerDetailsForm
        travelerDetails={travelerDetails}
        setTravelerDetails={setTravelerDetails}
        handleBooking={handleBooking}
      />
    </div>
  );
};

export default BookingPage;
