"use client";

import { useCart } from "@/components/Payment/cartContent";
import { useState } from "react";
import axios from "axios";
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

    // booking logic here if you want to handle it immediately after payment
    /*
    for (const item of cart) {
      if (item.type === "hotel") {
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
                  hotelOfferId: item.id,
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
          console.log("Booking successful: ", response.data);
        } catch (error) {
          console.error("Booking failed: ", error);
        }
      }

      if (item.type === "flight") {
        try {
          const bookingDetails = {
            data: {
              type: 'flight-order',
              flightOffers: [item.details],
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
  
          const response = await axios.post("/api/flights/book", bookingDetails);
          console.log("Flight booking successful: ", response.data);
        } catch (error) {
          console.error("Flight booking failed: ", error);
        }
      }
    }
    */
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
