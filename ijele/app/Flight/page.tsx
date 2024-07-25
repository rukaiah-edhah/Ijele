"use client";

import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import SearchNav from '@/components/Hotel/search-nav'
import FlightList from '@/components/Flight/FlightList'

const FlightPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<string>('1');
  const [flights, setFlights] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [travelerDetails, setTravelerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    documentType: '',
    passportNumber: '',
    passportExpiryDate: '',
    passportIssuanceCountry: '',
    nationality: ''
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
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setFlights([]); // Clear the flights list on error
      setError(err.response ? err.response.data : err.message);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bookingDetails = {
        data: {
          flightOffers: [selectedFlight],
          travelers: [
            {
              id: '1',
              dateOfBirth: travelerDetails.dateOfBirth,
              name: {
                firstName: travelerDetails.firstName,
                lastName: travelerDetails.lastName,
              },
              contact: {
                emailAddress: travelerDetails.email,
              },
              documents: [
                {
                  documentType: 'PASSPORT',
                  number: travelerDetails.passportNumber,
                  expiryDate: travelerDetails.passportExpiryDate,
                  issuanceCountry: travelerDetails.passportIssuanceCountry,
                  nationality: travelerDetails.nationality,
                  holder: true,
                },
              ],
            },
          ],
        },
      };

      console.log('Sending booking details:', bookingDetails);
      const response = await axios.post('/api/flights/book', bookingDetails);
      alert('Flight booked successfully!');
      setSelectedFlight(null); // Clear the selected flight
    } catch (err: any) {
      console.error('Booking error:', err);
      alert('Failed to book flight. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <SearchNav />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Flight Page</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Search Flights</h2>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin airport code"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination airport code"
              className="input input-bordered w-full max-w-xs"
            />
            <label>Enter departure date</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              placeholder="Enter departure date"
              className="input input-bordered w-full max-w-xs"
            />
            <label>Enter return date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              placeholder="Enter return date"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              placeholder="Enter number of adults"
              className="input input-bordered w-full max-w-xs"
            />
            <button onClick={fetchFlights} className="btn btn-primary mt-2">
              Search
            </button>
          </div>
        </div>

        <div>
          <FlightList flights={flights} />
        </div>


{/* 
        <button
          onClick={() => setSelectedFlight(flight)}
          className="btn btn-secondary mt-2"
        >
          Select Flight
        </button>
      </li>
              ))}
    </ul>
          </div >
        )} */}

{
  selectedFlight && (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Traveler Details</h2>
      <form onSubmit={handleBooking}>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={travelerDetails.firstName}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, firstName: e.target.value })}
            placeholder="Enter first name"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={travelerDetails.lastName}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, lastName: e.target.value })}
            placeholder="Enter last name"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="email"
            value={travelerDetails.email}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, email: e.target.value })}
            placeholder="Enter email address"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <label>Enter traveler Date of Birth</label>
          <input
            type="date"
            value={travelerDetails.dateOfBirth}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, dateOfBirth: e.target.value })}
            placeholder="Enter date of birth"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={travelerDetails.documentType}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, documentType: e.target.value })}
            placeholder="Enter document type"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={travelerDetails.passportNumber}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, passportNumber: e.target.value })}
            placeholder="Enter document number"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <label>Enter document expiration date</label>
          <input
            type="date"
            value={travelerDetails.passportExpiryDate}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, passportExpiryDate: e.target.value })}
            placeholder="Enter document expiry date"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={travelerDetails.passportIssuanceCountry}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, passportIssuanceCountry: e.target.value })}
            placeholder="Enter document issuance country code"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={travelerDetails.nationality}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, nationality: e.target.value })}
            placeholder="Enter nationality code"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <button type="submit" className="btn btn-primary mt-2">
            Book Flight
          </button>
        </div>
      </form>
    </div>
  )
}

{
  error && (
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
  )
}
      </div >
    </div >
  );
};

export default FlightPage;