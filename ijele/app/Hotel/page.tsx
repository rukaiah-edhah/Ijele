// This is a simple frontend page that displays a list of hotels (for test purposes). Feel free to modify/delete it later.

// To access this page in the browser, go to http://localhost:3000/Hotel, after you have started the dev server.

// If you put NYC or PAR on the search bar, you will get a list of hotels in New York City or Paris, respectively.
// If you put a city code that does not exist, you will get an error message.

"use client";

import { useState } from 'react';
import { Hotel } from '@/lib/interfaces';
import axios from 'axios';
import LocationSearch from '@/components/LocationSearch';

const HotelPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; iataCode: string } | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<any>(null);

  const fetchHotels = async () => {
    if (!selectedLocation) {
      setError({ error: 'Please select a location.' });
      return;
    }
    try {
      const response = await axios.get('/api/hotels/list', { params: { cityCode: selectedLocation.iataCode } });
      setHotels(response.data.data);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setHotels([]); // Clear the hotels list on error
      setError(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Hotel Page</h1>

      <LocationSearch onSelect={setSelectedLocation} />

      <button onClick={fetchHotels} className="btn btn-primary ml-2">
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
  );
};

export default HotelPage;
