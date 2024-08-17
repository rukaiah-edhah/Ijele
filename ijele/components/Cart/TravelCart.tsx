"use client";

import { useCart } from "@/components/Payment/cartContent";
import { useState } from "react";
import { CartItem, Itinerary } from "@/lib/interfaces";
import { Segment } from "next/dist/server/app-render/types";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import SearchNav from "@/components/SearchPage/search-nav";

const TravelCart = () => {
  const { cart, setCart } = useCart(); 
  const [parties, setParties] = useState<number>(1);
  const [payments, setPayments] = useState<number[]>(new Array(parties).fill(0));

  const router = useRouter();

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
      <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Images/turtle.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-2xl w-half mx-4 sm:mx-auto">
          <h1 className="text-4xl font-bold font-junge text-ijele_teal mb-4 text-center">Travel Cart</h1>
          <ul className="space-y-4">
            {cart.map((item: CartItem, index: number) => (
              <li key={index} className="border-b pb-4">
                {item.type === 'hotel' ? (
                  <>
                    <h2 className="text-2xl font-semibold">{item.details.name}</h2>
                    <p>{item.details.room?.description.text}</p>
                    {item.details.image && <img src={item.details.image} alt={item.details.name} className="w-1/2 mt-2 mx-auto" />}
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">Flight Offer</h3>
                    {item.details.itineraries?.map((itinerary: Itinerary, i: number) => (
                      <div key={i} className="border-t pt-4">
                        <h4 className="text-lg font-semibold">Itinerary {i + 1}</h4>
                        <p>Duration: {itinerary.duration}</p>
                        <ul className="list-disc pl-5">
                          {itinerary.segments.map((segment: Segment, j: number) => (
                            <li key={j}>
                              <p><strong>Departure:</strong> {segment.departure.iataCode} at {new Date(segment.departure.at).toLocaleString()}</p>
                              <p><strong>Arrival:</strong> {segment.arrival.iataCode} at {new Date(segment.arrival.at).toLocaleString()}</p>
                              <p><strong>Aircraft:</strong> {segment.aircraft.code}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                )}
                <p className="text-lg font-semibold">Price: ${item.price}</p>
                <button
                  onClick={() => handleRemoveFromCart(index)}
                  className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold font-junge text-ijele_deepGold  mt-4 text-center">Total: ${cartTotal}</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold font-junge text-ijele_navy text-center">Split Payment</h3>
            {Array(parties).fill(0).map((_, index) => (
              <div key={index} className="mb-2 flex items-center justify-center text-ijele_teal font-junge">
                <label className="mr-2">Party {index + 1} Contribution: </label>
                <input
                  type="number"
                  value={payments[index] || 0}
                  onChange={(e) => handleSplitPayment(index, parseFloat(e.target.value))}
                  className="border rounded py-1 px-2"
                />
              </div>
            ))}
            <div className="flex justify-center mt-2">
              <button onClick={() => setParties(parties + 1)} className="bg-blue-500 text-white py-1 px-4 rounded">
                Add Party
              </button>
              <button onClick={() => setParties(parties - 1)} disabled={parties <= 1} className="ml-2 bg-gray-500 text-white py-1 px-4 rounded" >
                Remove Party
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={handleCheckout} className="bg-green-500 text-white py-2 px-4 rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelCart;
