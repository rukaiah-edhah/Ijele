"use client";

import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import SearchNav from '@/components/SearchPage/search-nav';
import FlightList from '@/components/Flight/FlightList';
import TravelerDetailForm from '@/components/Flight/TravelerDetailForm';
import { Flight } from '@/components/Flight/FlightType';
import { useCart } from '@/components/Payment/cartContent';
import { useRouter } from "next/navigation";
import FlightSideBar from '@/components/SearchPage/flight-sidebar';
import createFlightOrder from '@/lib/flight/bookFlight';

const FlightPage: React.FC = () => {
  const router = useRouter();
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
  const [bookingStatus, setBookingStatus] = useState<'notStarted' | 'booked' | 'error'>('notStarted');
  const { addToCart } = useCart();

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

  const handleSearch = (origin: string, destination: string, departureDate: string, returnDate: string, adults: string) => {
    setOrigin(origin);
    setDestination(destination);
    setDepartureDate(departureDate);
    setReturnDate(returnDate);
    setAdults(adults);
    fetchFlights();
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
      setBookingStatus('booked');
      alert('Flight booked successfully!');

      if (selectedFlight) {
        addToCart({
          id: selectedFlight.id.toString(),
          type: 'flight',
          details: selectedFlight,
          price: parseFloat(response.data.data.price), // Replace with actual price
        });
        alert('Flight added to cart!');
      }

      setSelectedFlight(null); // Clear the selected flight
    } catch (err: any) {
      alert('Failed to book flight. Please try again.');
    }
  };

  const handlePayNow = () => {
    router.push('Payment')
    alert('Redirecting to payment page...');
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

  const handleAddToCart = () => {
    if (selectedFlight) {
      addToCart({
        id: selectedFlight.id,
        type: 'flight',
        details: selectedFlight,
        price: 0
      });
      alert('Flight added to cart!');
    }
  };

  return (
    <div>
      <Navbar currentPage='Flight' />
      <SearchNav currentPage='Flight' />
      <div className="flex">
        {/* Original search bar */}
        <div className="p-6 flex-grow">
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

        {bookingStatus && (
            <div className="mt-6">
              <p className="text-green-500">{bookingStatus}</p>
              <button onClick={handlePayNow} className="btn btn-primary mt-2">
                Pay Now
              </button>
              <button onClick={handleAddToCart} className="btn btn-secondary mt-2 ml-4">
                Add to Cart
              </button>
            </div>
          )}


        {error && (
          <div className="mt-6 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Sidebar */}
      {/* <FlightSideBar onSearch={fetchFlights} /> */}
    </div>
  );
};

export default FlightPage;
