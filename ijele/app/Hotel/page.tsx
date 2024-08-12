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
import { hotelCarouselImages } from "@/components/ImageMapping";
import DaisyUICarousel from "@/components/SearchPage/carousel";



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
      {/* <div> */}
      <Navbar currentPage="Hotel" />
      <SearchNav currentPage="Hotel" />
      <div className="">
        <div className="absolute max-h-auto">
      {DaisyUICarousel(hotelCarouselImages)}
        </div>
      <div className='max-h-screen overflow-auto sidebar-container place-content-center no-scrollbar'>
        {/* search bar section */}
        <div className='flex justify-center items-center space-y-3'>
          <button onClick={handleSearch} className="justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF6EE"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
          </button>

          <LocationSearch onSelect={setSelectedLocation} />
          <div className='flex items-center bg-ijele_cream rounded-lg'>
            <input value={adults} onChange={(e) => setAdults(parseInt(e.target.value, 10))} min="1" className='sidebar-inputfield w-12 h-4 rounded-md m-2 p-2 focus:outline-none' type="number" />
            <i className="fa-solid fa-user fa-sm pr-2 text-[#DDCCBD]" />
          </div>
        </div>
        <div className="flex items-center text-sm text-ijele_cream font-ijele_cream border-b">
          <input type="date" value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)} className="sidebar-inputfield bg-ijele_teal w-1/2" />
          -
          <input type="date" value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)} className="sidebar-inputfield bg-ijele_teal w-1/2" />
        </div>
        <HotelSideBar />
      </div>

      </div>
      <div className="max-w-auto flex flex-wrap justify-evenly m-4 space-x-4">
        {/* display results or ERROR*/}
        {hotels.length > 0 && (
          <HotelList hotels={hotels} handleViewOffers={handleViewOffers} />
        )}
        {error && <SearchErrorMessage error={error} />}
      </div >

      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default HotelPage;

















{/* <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Hotel Page</h1> {/*delete later*
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
    <div className="max-w-auto flex flex-wrap justify-evenly p-6"> */}