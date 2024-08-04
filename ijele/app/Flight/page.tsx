"use client";

import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import SearchNav from '@/components/SearchPage/search-nav';
import FlightSideBar from '@/components/SearchPage/flight-sidebar';
import SearchFlightForm from '@/components/Flight/SearchFlightForm';
import FlightListDisplay from '@/components/Flight/FlightListDisplay';
import TravelerDetailsForm from '@/components/Flight/TravelerDetailsForm';
import '@/components/Flight/flightList.css';
import { TravelerDetails } from '@/lib/interfaces';


const FlightPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<string>('1');
  const [flights, setFlights] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
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
  const [error, setError] = useState<any>(null);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/api/flights/search', {
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate,
          returnDate,
          adults,
        },
      });
      setFlights(response.data.data);
      setError(null);
    } catch (err: any) {
      setFlights([]);
      setError(err.response ? err.response.data : err.message);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const bookingDetails = {
        data: {
          type: 'flight-order',
          flightOffers: [selectedFlight],
          travelers: [
            {
              id: '1',
              dateOfBirth: travelerDetails.dateOfBirth,
              name: {
                firstName: travelerDetails.firstName,
                lastName: travelerDetails.lastName,
              },
              gender: travelerDetails.gender,
              contact: {
                emailAddress: travelerDetails.email,
                phones: [
                  {
                    deviceType: travelerDetails.deviceType,
                    countryCallingCode: travelerDetails.countryCallingCode,
                    number: travelerDetails.number,
                  },
                ],
              },
              documents: [
                {
                  documentType: travelerDetails.documentType,
                  birthPlace: travelerDetails.birthPlace,
                  issuanceLocation: travelerDetails.issuanceLocation,
                  issuanceDate: travelerDetails.issuanceDate,
                  number: travelerDetails.passportNumber,
                  expiryDate: travelerDetails.passportExpiryDate,
                  issuanceCountry: travelerDetails.passportIssuanceCountry,
                  validityCountry: travelerDetails.validityCountry,
                  nationality: travelerDetails.nationality,
                  holder: travelerDetails.holder,
                },
              ],
            },
          ],
          ticketingAgreement: {
            option: 'DELAY_TO_CANCEL',
            delay: '6D',
          },
          remarks: { general: [{ subType: 'GENERAL', text: 'Booking remarks' }] },
          contacts: [
            {
              addresseeName: {
                firstName: travelerDetails.firstName,
                lastName: travelerDetails.lastName,
              },
              emailAddress: travelerDetails.email,
              phones: [
                {
                  deviceType: travelerDetails.deviceType,
                  countryCallingCode: travelerDetails.countryCallingCode,
                  number: travelerDetails.number,
                },
              ],
            },
          ],
        },
      };
  
      await axios.post('/api/flights/book', bookingDetails);
      alert('Flight booked successfully!');
      setSelectedFlight(null);
    } catch (err: any) {
      console.error('Booking error:', err);
      alert('Failed to book flight. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <SearchNav />
      <FlightSideBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Flight Page</h1>
        <SearchFlightForm
          fetchFlights={fetchFlights}
          setOrigin={setOrigin}
          setDestination={setDestination}
          setDepartureDate={setDepartureDate}
          setReturnDate={setReturnDate}
          setAdults={setAdults}
        />
        <FlightListDisplay flights={flights} setSelectedFlight={setSelectedFlight} />
        {selectedFlight && (
          <TravelerDetailsForm
            travelerDetails={travelerDetails}
            setTravelerDetails={setTravelerDetails}
            handleBooking={handleBooking}
          />
        )}
        {error && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Error</h2>
            <div className="bg-red-100 p-4 rounded">
              <p>{error.error}</p>
              {error.details?.errors?.map((errDetail: any, index: number) => (
                <div key={index}>
                  <p><strong>{errDetail.title}</strong></p>
                  <p>Code: {errDetail.code}</p>
                  <p>{errDetail.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightPage;
