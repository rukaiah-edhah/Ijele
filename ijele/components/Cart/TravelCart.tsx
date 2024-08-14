"use client";

import { useCart } from "@/components/Payment/cartContent";
import { useState } from "react";
import { GuestInfo, PaymentCardInfo, CartItem, TravelerDetails, FlightOfferDetails, Itinerary } from "@/lib/interfaces";
import { Segment } from "next/dist/server/app-render/types";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import SearchNav from "@/components/SearchPage/search-nav";

const TravelCart = () => {
  const { cart, setCart } = useCart(); 
  const [parties, setParties] = useState<number>(1);
  const [payments, setPayments] = useState<number[]>([0]);
  
  const [travelerDetails, setTravelerDetails] = useState<TravelerDetails>({
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

  const router = useRouter();


  const guestInfo: GuestInfo = {
    tid: 1,
    title: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  };

  const paymentInfo: PaymentCardInfo = {
    vendorCode: "",
    cardNumber: "",
    expiryDate: "",
    holderName: "",
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart); 
  };

  const handleSplitPayment = (index: number, value: number) => {
    const newPayments = [...payments];
    newPayments[index] = value;
    setPayments(newPayments);
  };

  const handleCheckout = async () => {
    const cartTotal = cart.reduce((total, item) => total + item.price, 0);

    if (payments.reduce((acc, cur) => acc + cur, 0) !== cartTotal) {
      alert('Total payment must equal cart total.');
      return;
    }

    const contributions = payments.join(',');
    const url = `/Payment?parties=${parties}&contributions=${contributions}`;
    router.push(url);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <>
    <Navbar currentPage="Cart" />
    <SearchNav currentPage="Cart" />
      <h1>Travel Cart</h1>
      <ul>
        {cart.map((item: CartItem, index: number) => (
          <li key={index}>
            {item.type === 'hotel' ? (
              <>
                <p>Hotel: {item.details.name}</p>
                <p>{item.details.room?.description.text}</p>
                {item.details.image && <img src={item.details.image} alt={item.details.name} />}
              </>
            ) : (
              <>
                <h3>Flight Offer</h3>
                {item.details.itineraries?.map((itinerary: Itinerary, i: number) => (
                  <div key={i} className="itinerary">
                    <h4>Itinerary {i + 1}</h4>
                    <p>Duration: {itinerary.duration}</p>
                    <ul>
                      {itinerary.segments.map((segment: Segment, j: number) => (
                        <li key={j}>
                          <p>Departure: {segment.departure.iataCode} at {new Date(segment.departure.at).toLocaleString()}</p>
                          <p>Arrival: {segment.arrival.iataCode} at {new Date(segment.arrival.at).toLocaleString()}</p>
                          <p>Aircraft: {segment.aircraft.code}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${cartTotal}</h2>
      <h3>Split Payment</h3>
      {Array(parties).fill(0).map((_, index) => (
        <div key={index}>
          <label>Party {index + 1} Contribution: </label>
          <input
            type="number"
            value={payments[index] || 0}
            onChange={(e) => handleSplitPayment(index, parseFloat(e.target.value))} />
        </div>
      ))}
      <button onClick={() => setParties(parties + 1)}>Add Party</button>
      <button onClick={() => setParties(parties - 1)} disabled={parties <= 1}>Remove Party</button>
      <button onClick={handleCheckout}>Checkout</button>
  </>
  );
};

export default TravelCart;
