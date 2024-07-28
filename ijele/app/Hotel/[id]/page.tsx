"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Offer, Hotel } from "@/lib/interfaces";
import Navbar from "@/components/navbar";
import SearchNav from "@/components/Hotel/search-nav";

const HotelDetailsPage: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<any>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const [guestInfo, setGuestInfo] = useState({
    tid: 1,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    vendorCode: '',
    cardNumber: '',
    expiryDate: '',
    holderName: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const hotelId = pathname.split("/")[2];
  const checkInDate = searchParams.get("checkInDate") || "";
  const checkOutDate = searchParams.get("checkOutDate") || "";
  const adults = Number(searchParams.get("adults")) || 1;

  const fetchHotelOffers = useCallback(async () => {
    if (!hotelId) return;

    try {
      const response = await axios.get('/api/hotels/search', {
        params: {
          hotelIds: hotelId,
          checkInDate,
          checkOutDate,
          adults,
        },
      });

      const outerData = response.data || [];
      const hotelData = outerData.flatMap((outerItem: any) => outerItem.data || []);
      const offersData = hotelData.flatMap((hotel: Hotel) => hotel.offers || []);

      const validOffers = offersData.filter((offer: Offer) => offer.room.description.text && offer.price.total);

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
    if (!guestInfo.firstName.trim() || !guestInfo.lastName.trim() || !guestInfo.phone.trim() || !guestInfo.email.trim()) {
      return "Please fill out all guest information fields.";
    }
    if (!paymentInfo.vendorCode.trim() || !paymentInfo.cardNumber.trim() || !paymentInfo.expiryDate.trim() || !paymentInfo.holderName.trim()) {
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
      const response = await axios.post('/api/hotels/book', {
        data: {
          type: 'hotel-order',
          guests: [guestInfo],
          travelAgent: {
            contact: {
              email: guestInfo.email,
            },
          },
          roomAssociations: [
            {
              guestReferences: [{ guestReference: '1' }],
              hotelOfferId: offerId,
            },
          ],
          payment: {
            method: 'CREDIT_CARD',
            paymentCard: {
              paymentCardInfo: paymentInfo,
            },
          },
        },
      });

      setBookingSuccess('Booking successful! Confirmation: ' + response.data.data.id);
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
      <Navbar />
      <SearchNav />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Hotel Details</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Guest Information</h2>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} className="input input-bordered ml-2" />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} className="input input-bordered ml-2" />
          <input type="text" name="phone" placeholder="Phone" onChange={handleInputChange} className="input input-bordered ml-2" />
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="input input-bordered ml-2" />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
          <input type="text" name="vendorCode" placeholder="Card Type" onChange={handlePaymentChange} className="input input-bordered ml-2" />
          <input type="text" name="cardNumber" placeholder="Card Number" onChange={handlePaymentChange} className="input input-bordered ml-2" />
          <input type="text" name="expiryDate" placeholder="Expiry Date" onChange={handlePaymentChange} className="input input-bordered ml-2" />
          <input type="text" name="holderName" placeholder="Holder Name" onChange={handlePaymentChange} className="input input-bordered ml-2" />
        </div>

        {formError && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Form Error</h2>
            <div className="bg-red-100 p-4 rounded">
              <p>{formError}</p>
            </div>
          </div>
        )}

        {offers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Hotel Offers</h2>
            <ul className="list-disc pl-5">
              {offers.map((offer) => (
                <li key={offer.id} className="mb-2">
                  Room: {offer.room.description.text} - Price: {offer.price.total} {offer.price.currency}
                  <button onClick={() => handleBookHotel(offer.id)} className="btn btn-primary ml-2">
                    Book Now
                  </button>
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
              )) || <p>{JSON.stringify(error)}</p>}
            </div>
          </div>
        )}

        {bookingSuccess && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Success</h2>
            <div className="bg-green-100 p-4 rounded">
              <p>{bookingSuccess}</p>
            </div>
          </div>
        )}

        {bookingError && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Booking Error</h2>
            <div className="bg-red-100 p-4 rounded">
              {typeof bookingError === 'string' ? (
                <p>{bookingError}</p>
              ) : (
                <pre>{JSON.stringify(bookingError, null, 2)}</pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetailsPage;