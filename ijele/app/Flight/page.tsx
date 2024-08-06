"use client";

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import SearchNav from '@/components/SearchPage/search-nav';
import FlightList from '@/components/Flight/FlightList';
import TravelerDetailForm from '@/components/Flight/TravelerDetailForm';
import FlightSideBar from '@/components/SearchPage/flight-sidebar';
import { Flight } from '@/components/Flight/FlightType';


const FlightPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<string>('1');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [travelerDetails, setTravelerDetails] = useState({
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
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setFlights([]); // Clear the flights list on error
      setError(err.response ? err.response.data : err.message);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFlight) {
      alert('Please select a flight.');
      return;
    }

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
              gender: travelerDetails.gender.toUpperCase(),
              contact: {
                emailAddress: travelerDetails.email,
                phones: [
                  {
                    deviceType: 'MOBILE'.toUpperCase(),
                    countryCallingCode: travelerDetails.countryCallingCode,
                    number: travelerDetails.number,
                  },
                ],
              },
              documents: [
                {
                  documentType: 'PASSPORT'.toUpperCase(),
                  birthPlace: travelerDetails.birthPlace,
                  issuanceLocation: travelerDetails.issuanceLocation,
                  issuanceDate: travelerDetails.issuanceDate,
                  number: travelerDetails.passportNumber,
                  expiryDate: travelerDetails.passportExpiryDate,
                  issuanceCountry: travelerDetails.passportIssuanceCountry.toUpperCase(),
                  validityCountry: travelerDetails.validityCountry.toUpperCase(),
                  nationality: travelerDetails.nationality.toUpperCase(),
                  holder: travelerDetails.holder,
                },
              ],
            },
          ],
          ticketingAgreement: {
            option: 'DELAY_TO_CANCEL',
            delay: '6D',
          },
          remarks: {
            general: [
              {
                subType: 'GENERAL_MISCELLANEOUS',
                text: 'ONLINE BOOKING FROM INCREIBLE VIAJES',
              },
            ],
          },
          contacts: [
            {
              addresseeName: {
                firstName: 'PABLO',
                lastName: 'RODRIGUEZ',
              },
              companyName: 'INCREIBLE VIAJES',
              purpose: 'STANDARD',
              phones: [
                {
                  deviceType: 'LANDLINE',
                  countryCallingCode: '34',
                  number: '480080071',
                },
                {
                  deviceType: 'MOBILE',
                  countryCallingCode: '33',
                  number: '480080072',
                },
              ],
              emailAddress: 'support@increibleviajes.es',
              address: {
                lines: ['Calle Prado, 16'],
                postalCode: '28014',
                cityName: 'Madrid',
                countryCode: 'ES',
              },
            },
          ],
        },
      };

      const response = await axios.post('/api/flights/book', bookingDetails);
      alert('Flight booked successfully!');
      setSelectedFlight(null); // Clear the selected flight
    } catch (err: any) {
      alert('Failed to book flight. Please try again.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onBookFlight = async (flight: Flight) => {
    try {
      const bookingDetails = {
        flightId: flight.id,
        // Add any other necessary booking parameters here
      };
      const response = await axios.post('/api/flights/book', bookingDetails);
      alert('Flight booked successfully!');
    } catch (err) {
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
              className="input input-bordered w-full max-w-xs"
            />
            <label>Enter return date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label>Enter number of Adults</label>
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <button onClick={fetchFlights} className="btn btn-primary mt-2">
              Search
            </button>
          </div>
        </div>

        <div className="mt-6">
          <FlightList
            flights={flights}
            onSelectFlight={(flight) => setSelectedFlight(flight)}
          />
        </div>

        {flights.length > 0 && (
          <div className="mb-6">
            {/* <h2 className="text-2xl font-semibold mb-2">Select Flight and Enter Details</h2> */}
            {selectedFlight && (
              <form onSubmit={handleBooking}>
                <TravelerDetailForm
                  travelerDetails={travelerDetails}
                  handleInputChange={handleInputChange}
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Book Flight
                </button>
              </form>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightPage;
