"use client";

import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import SearchNav from '@/components/SearchPage/search-nav';
import FlightList from '@/components/Flight/FlightList';
import '@/components/Flight/flightList.css';
import { data } from 'autoprefixer';
import { Traveler, Documents, Phone, TicketingAgreement } from '@/lib/interfaces';
import FlightSideBar from '@/components/SearchPage/flight-sidebar';

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
      console.log('API Response:', response);

      setFlights(response.data.data);
      console.log('Flight Data:', response.data.data);
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
              gender: travelerDetails.gender.toUpperCase(), // should be uppercase "MALE" or "FEMALE"
              contact: {
                emailAddress: travelerDetails.email,
                phones: [
                  {
                    deviceType: 'MOBILE', 
                    countryCallingCode: travelerDetails.countryCallingCode,
                    number: travelerDetails.number,
                  },
                ],
              },
              documents: [
                {
                  documentType: 'PASSPORT',
                  birthPlace: travelerDetails.birthPlace,
                  issuanceLocation: travelerDetails.issuanceLocation,
                  issuanceDate: travelerDetails.issuanceDate,
                  number: travelerDetails.passportNumber,
                  expiryDate: travelerDetails.passportExpiryDate,
                  issuanceCountry: travelerDetails.passportIssuanceCountry,
                  validityCountry: travelerDetails.validityCountry,
                  nationality: travelerDetails.nationality,
                  holder: true,
                },
              ],
            },
            // additional travelers will be added here (in a similar structure)
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
      console.log('Booking response:', response.data);
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
      <FlightSideBar/>
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
            <label>Enter number of Adults</label>
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
          <div className="mt-6">
            <FlightList flights={flights} />
          </div>
        </div>



        <button
          onClick={() => setSelectedFlight(flights)}
          className="btn btn-secondary mt-2"
        >
          Select Flight
        </button>
      </div>


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
        {flights.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Flights</h2>
            <ul className="list-disc pl-5">
              {flights.map((flight) => (
                <li key={flight.id} className="mb-2">
                  <p>Flight ID: {flight.id}</p>
                  <p>Source: {flight.source}</p>
                  <p>Instant Ticketing Required: {flight.instantTicketingRequired ? 'Yes' : 'No'}</p>
                  <p>Non-Homogeneous: {flight.nonHomogeneous ? 'Yes' : 'No'}</p>
                  <p>paymentCardRequired: {flight.paymentCardRequired ? 'Yes' : 'No'}</p>
                  <p>One Way: {flight.oneWay ? 'Yes' : 'No'}</p>
                  <p>Is Upsell Offer: {flight.isUpsellOffer ? 'Yes' : 'No'}</p>
                  <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
                  <p>Number of Bookable Seats: {flight.numberOfBookableSeats}</p>
                  {flight.itineraries.map((itinerary: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Itinerary {index + 1}</h3>
                      <p>Duration: {itinerary.duration}</p>
                      <ul className="list-disc pl-5">
                        {itinerary.segments.map((segment: any, idx: number) => (
                          <li key={idx} className="mb-2">
                            <p>Departure: {segment.departure.iataCode} at {segment.departure.at}</p>
                            <p>Arrival: {segment.arrival.iataCode} at {segment.arrival.at}</p>
                            <p>Carrier Code: {segment.carrierCode}</p>
                            <p>Flight Number: {segment.number}</p>
                            <p>Aircraft: {segment.aircraft.code}</p>
                            <p>Operating Carrier: {segment.operating ? segment.operating.carrierCode : 'N/A'}</p>
                            <p>Duration: {segment.duration}</p>
                            <p>Number of Stops: {segment.numberOfStops}</p>
                            <p>Blacklisted in EU: {segment.blacklistedInEU ? 'Yes' : 'No'}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <h4 className="text-lg font-semibold mb-1">Price</h4>
                  <p>Total: {flight.price.total} {flight.price.currency}</p>
                  <p>Base: {flight.price.base}</p>
                  <ul>
                    {flight.price.fees.map((fee: any, idx: number) => (
                      <li key={idx}>{fee.type}: {fee.amount}</li>
                    ))}
                  </ul>
                  <p>Grand Total: {flight.price.grandTotal}</p>
                  <h4 className="text-lg font-semibold mb-1">Pricing Options</h4>
                  <p>Fare Type: {flight.pricingOptions.fareType.join(', ')}</p>
                  <p>Included Checked Bags Only: {flight.pricingOptions.includedCheckedBagsOnly ? 'Yes' : 'No'}</p>
                  <p>Validating Airline Codes: {flight.validatingAirlineCodes.join(', ')}</p>
                  <h4 className="text-lg font-semibold mb-1">Traveler Pricings</h4>
                  {flight.travelerPricings.map((travelerPricing: any, idx: number) => (
                    <div key={idx} className="mb-4">
                      <p>Traveler ID: {travelerPricing.travelerId}</p>
                      <p>Fare Option: {travelerPricing.fareOption}</p>
                      <p>Traveler Type: {travelerPricing.travelerType}</p>
                      <p>Total Price: {travelerPricing.price.total} {travelerPricing.price.currency}</p>
                      <p>Base Price: {travelerPricing.price.base}</p>
                      <ul>
                        {travelerPricing.fareDetailsBySegment.map((fareDetail: any, idx: number) => (
                          <li key={idx}>
                            <p>Segment ID: {fareDetail.segmentId}</p>
                            <p>Cabin: {fareDetail.cabin}</p>
                            <p>Fare Basis: {fareDetail.fareBasis}</p>
                            <p>Class: {fareDetail.class}</p>
                            <p>Included Checked Bags: {fareDetail.includedCheckedBags ? fareDetail.includedCheckedBags.quantity : 'N/A'}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button
                    onClick={() => setSelectedFlight(flight)}
                    className="btn btn-secondary mt-2"
                  >
                    Select Flight
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
       
        {selectedFlight && (
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
                  type="text"
                  value={travelerDetails.gender}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, gender: e.target.value })}
                  placeholder="Enter gender"
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
                /><input
                type="text"
                value={travelerDetails.deviceType}
                onChange={(e) => setTravelerDetails({ ...travelerDetails, deviceType: e.target.value })}
                placeholder="Enter Device Type"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <input
                  type="text"
                  value={travelerDetails.countryCallingCode}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, countryCallingCode: e.target.value })}
                  placeholder="Enter Country Calling Code"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <input
                  type="number"
                  value={travelerDetails.number}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, number: e.target.value })}
                  placeholder="Enter device number"
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
                  value={travelerDetails.birthPlace}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, birthPlace: e.target.value })}
                  placeholder="Enter Birth Place"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  value={travelerDetails.issuanceLocation}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, issuanceLocation: e.target.value })}
                  placeholder="Enter Issuance Location"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <label>Enter Date of Issuance</label>
                <input
                  type="date"
                  value={travelerDetails.issuanceDate}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, issuanceDate: e.target.value })}
                  placeholder="Enter date of Issuance"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  value={travelerDetails.passportNumber}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, passportNumber: e.target.value })}
                  placeholder="Enter passport number"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <label>Enter passport expiration date</label>
                <input
                  type="date"
                  value={travelerDetails.passportExpiryDate}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, passportExpiryDate: e.target.value })}
                  placeholder="Enter passport expiry date"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  value={travelerDetails.passportIssuanceCountry}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, passportIssuanceCountry: e.target.value })}
                  placeholder="Enter issuance country code"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <input
                  type="text"
                  value={travelerDetails.validityCountry}
                  onChange={(e) => setTravelerDetails({ ...travelerDetails, validityCountry: e.target.value })}
                  placeholder="Enter issuance country code"
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
        )}

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
  );
};

export default FlightPage;