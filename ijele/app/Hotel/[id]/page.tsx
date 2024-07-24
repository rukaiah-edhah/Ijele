"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Offer, Hotel } from "@/lib/interfaces";
import Navbar from "@/components/navbar";

const HotelDetailsPage: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<any>(null);

  const hotelId = pathname.split("/")[2];
  const checkInDate = searchParams.get("checkInDate") || "";
  const checkOutDate = searchParams.get("checkOutDate") || "";
  const adults = Number(searchParams.get("adults")) || 1;

  const fetchHotelOffers = useCallback(async () => {
    if (!hotelId) return;

    try {
      const response = await axios.get("/api/hotels/search", {
        params: {
          hotelIds: hotelId,
          checkInDate,
          checkOutDate,
          adults,
        },
      });

      const outerData = response.data || [];
      const hotelData = outerData.flatMap(
        (outerItem: any) => outerItem.data || []
      );
      const offersData = hotelData.flatMap(
        (hotel: Hotel) => hotel.offers || []
      );

      const validOffers = offersData.filter(
        (offer: Offer) => offer.room.description.text && offer.price.total
      );

      setOffers(validOffers);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching hotel offers:", err);
      setOffers([]);
      setError(err.response ? err.response.data : err.message);
    }
  }, [hotelId, checkInDate, checkOutDate, adults]);

  useEffect(() => {
    fetchHotelOffers();
  }, [fetchHotelOffers]);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Hotel Details</h1>

        {offers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Hotel Offers</h2>
            <ul className="list-disc pl-5">
              {offers.map((offer) => (
                <li key={offer.id} className="mb-2">
                  Room: {offer.room.description.text} - Price:{" "}
                  {offer.price.total} {offer.price.currency}
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
                  <p>
                    <strong>{errDetail.title}</strong>
                  </p>
                  <p>Code: {errDetail.code}</p>
                  <p>{errDetail.detail}</p>
                </div>
              )) || <p>{JSON.stringify(error)}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetailsPage;
