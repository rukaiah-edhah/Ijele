"use client";

import { useState } from 'react';
import { Hotel } from '@/lib/interfaces';
import Navbar from '@/components/navbar';
import axios from 'axios';
import LocationSearch from '@/components/LocationSearch';

const HotelPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; iataCode: string } | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<any>(null);
  const [checkInDate, setCheckInDate] = useState<string>(''); 
  const [checkOutDate, setCheckOutDate] = useState<string>(''); 
  const [adults, setAdults] = useState<number>(1); 

  const fetchHotels = async () => {
    if (!selectedLocation) {
      setError({ error: 'Please select a location.' });
      return;
    }
    try {
      const response = await axios.get('/api/hotels/list', { params: { cityCode: selectedLocation.iataCode } });
      setHotels(response.data.data);
      setError(null); 
    } catch (err: any) {
      setHotels([]);
      setError(err.response ? err.response.data : err.message);
    }
  };

  const fetchHotelOffers = async (hotelIds: string[]) => {
    try {
      const response = await axios.get('/api/hotels/search', {
        params: {
          hotelIds: hotelIds.join(','),
          checkInDate, 
          checkOutDate, 
          adults, 
        },
      });
      return response.data.data;
    } catch (err: any) {
      setError(err.response ? err.response.data : err.message);
      return [];
    }
  };

  const handleSearch = async () => { 
    await fetchHotels();
    if (hotels.length > 0) {
      const hotelIds = hotels.map(hotel => hotel.hotelId);
      const offers = await fetchHotelOffers(hotelIds);
      console.log('Hotel Offers:', offers);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Hotel Page</h1>
        <LocationSearch onSelect={setSelectedLocation} />
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)} 
          placeholder="Check-in Date"
          className="input input-bordered ml-2"
        />
        <input
          type="date"
          value={checkOutDate} 
          onChange={(e) => setCheckOutDate(e.target.value)} 
          placeholder="Check-out Date"
          className="input input-bordered ml-2"
        />
        <input
          type="number"
          value={adults} 
          onChange={(e) => setAdults(parseInt(e.target.value, 10))} 
          placeholder="Adults"
          className="input input-bordered ml-2"
          min="1"
        />
        <button onClick={handleSearch} className="btn btn-primary ml-2">
          Search
        </button>

        {hotels.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Hotels</h2>
            <ul className="list-disc pl-5">
              {hotels.map((hotel) => (
                <li key={hotel.hotelId} className="mb-2">
                  {hotel.name} - {hotel.address?.countryCode || 'N/A'}
                </li>
              ))}
            </ul>
          </div>
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

export default HotelPage;