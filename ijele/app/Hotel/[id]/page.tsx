"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Offer, Hotel } from "@/lib/interfaces";
import Navbar from "@/components/navbar";
import SearchNav from "@/components/SearchPage/search-nav";
import GuestInfoForm from "@/components/HotelDetailsPage/GuestInfoForm";
import PaymentInfoForm from "@/components/HotelDetailsPage/PaymentInfoForm";
import HotelOffers from "@/components/HotelDetailsPage/HotelOffers";
import ErrorMessage from "@/components/HotelDetailsPage/ErrorMessage";
import SuccessMessage from "@/components/HotelDetailsPage/SuccessMessage";
import BookingErrorMessage from "@/components/HotelDetailsPage/BookingErrorMessage";

const HotelDetailsPage: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<any>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const [guestInfo, setGuestInfo] = useState({
    tid: 1,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    vendorCode: "",
    cardNumber: "",
    expiryDate: "",
    holderName: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

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
      setOffers([]);
      setError(err.response ? err.response.data : err.message);
    }
  }, [hotelId, checkInDate, checkOutDate, adults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestInfo({ ...guestInfo, [name]: value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const validateForm = () => {
    if (
      !guestInfo.firstName.trim() ||
      !guestInfo.lastName.trim() ||
      !guestInfo.phone.trim() ||
      !guestInfo.email.trim()
    ) {
      return "Please fill out all guest information fields.";
    }
    if (
      !paymentInfo.vendorCode.trim() ||
      !paymentInfo.cardNumber.trim() ||
      !paymentInfo.expiryDate.trim() ||
      !paymentInfo.holderName.trim()
    ) {
      return "Please fill out all payment information fields.";
    }
    return null;
  };

  const handleBookHotel = async (offerId: string) => {
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setFormError(null);

    try {
      const response = await axios.post("/api/hotels/book", {
        data: {
          type: "hotel-order",
          guests: [guestInfo],
          travelAgent: {
            contact: {
              email: guestInfo.email,
            },
          },
          roomAssociations: [
            {
              guestReferences: [{ guestReference: "1" }],
              hotelOfferId: offerId,
            },
          ],
          payment: {
            method: "CREDIT_CARD",
            paymentCard: {
              paymentCardInfo: paymentInfo,
            },
          },
        },
      });

      setBookingSuccess(
        "Booking successful! Confirmation: " + response.data.data.id
      );
      setBookingError(null);
    } catch (err: any) {
      setBookingSuccess(null);
      setBookingError(err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchHotelOffers();
  }, [fetchHotelOffers]);

  return (
    <div>
      <Navbar currentPage={""} />
      <SearchNav currentPage={""} />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Hotel Details</h1>

        <GuestInfoForm
          guestInfo={guestInfo}
          handleInputChange={handleInputChange}
        />
        <PaymentInfoForm
          paymentInfo={paymentInfo}
          handlePaymentChange={handlePaymentChange}
        />

        {formError && <ErrorMessage error={{ error: formError }} />}

        {offers.length > 0 && (
          <HotelOffers offers={offers} handleBookHotel={handleBookHotel} />
        )}

        {error && <ErrorMessage error={error} />}

        {bookingSuccess && <SuccessMessage message={bookingSuccess} />}

        {bookingError && <BookingErrorMessage error={bookingError} />}
      </div>
    </div>
  );
};

export default HotelDetailsPage;
