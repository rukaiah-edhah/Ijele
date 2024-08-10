"use client";

import { useState, useCallback } from "react";
import { Hotel } from "@/lib/interfaces";
import Navbar from "@/components/navbar";
import axios from "axios";
import LocationSearch from "@/components/HotelListPage/LocationSearch";
import { useRouter } from "next/navigation";
import SearchNav from "@/components/SearchPage/search-nav";
import HotelList from "@/components/HotelListPage/HotelList";
import SearchErrorMessage from "@/components/HotelListPage/SearchErrorMessage";
import HotelSideBar from "@/components/SearchPage/hotel-sidebar";


const HotelPage: React.FC = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    iataCode: string;
  } | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<any>(null);
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);

  const fetchHotels = useCallback(async () => {
    if (!selectedLocation) {
      setError({ error: "Please select a location." });
      return;
    }
    try {
      const response = await axios.get("/api/hotels/list", {
        params: { cityCode: selectedLocation.iataCode },
      });
      setHotels(response.data.data);
      setError(null);
    } catch (err: any) {
      setHotels([]);
      setError(err.response ? err.response.data : err.message);
    }
  }, [selectedLocation]);

  const handleSearch = async () => {
    await fetchHotels();
  };

  const handleViewOffers = (hotelId: string) => {
    router.push(
      `/Hotel/${hotelId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}`
    );
  };

  return (
    <>
      <div>
        <Navbar currentPage="Hotel"/>
        <SearchNav currentPage="Hotel" />
        <HotelSideBar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Hotel Page</h1> {/*delete later*/}
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
          <div className="max-w-auto flex flex-wrap justify-evenly p-6">
            
            {/* display results or ERROR*/}
            {hotels.length > 0 && (
              <HotelList hotels={hotels} handleViewOffers={handleViewOffers} />
            )}
            {error && <SearchErrorMessage error={error} />}
          </div>

        </div>
      </div>
    </>
  );
};

export default HotelPage;