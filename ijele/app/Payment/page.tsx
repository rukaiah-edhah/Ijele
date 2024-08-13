"use client";


import { useState } from "react";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [amounts, setAmounts] = useState<number[]>([]);
    const [currency, setCurrency] = useState("usd");
    const [currentParty, setCurrentParty] = useState(0);
    const [clientSecret, setClientSecret] = useState<string | null>(null); 
  
    const parties = parseInt(searchParams.get("parties") || "1");
    const contributions = (searchParams.get("contributions") || "")
      .split(",")
      .map(Number);
  
    useEffect(() => {
      setAmounts(new Array(parties).fill(0));
    }, [parties]);
  
    const handleAmountChange = (index: number, value: string) => {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        console.error("Invalid number entered");
        return;
      }
      const newAmounts = [...amounts];
      newAmounts[index] = numericValue;
      setAmounts(newAmounts);
    };
  
    const handlePaymentSubmit = async (e: any) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      console.log(`Creating payment intent for Party ${currentParty + 1}`);
  
      if (amounts[currentParty] !== contributions[currentParty]) {
        alert(
          `Party ${currentParty + 1}'s contribution must be ${
            contributions[currentParty]
          }.`
        );
        return;
      }
  
      try {
        setClientSecret(null);
  
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amounts[currentParty], currency }),
        });
  
        const result = await response.json();
  
        if (response.ok && result.clientSecret) {
          console.log('Payment intent created:', result.clientSecret);
          setClientSecret(result.clientSecret); 
  
          const { error, paymentIntent } = await stripe.confirmCardPayment(
            result.clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement)!,
              },
            }
          );
  
          if (error) {
            console.error("Payment failed", error.message);
            return;
          } else if (paymentIntent?.status === "succeeded") {
            console.log(
              `Payment for Party ${currentParty + 1} successful`,
              paymentIntent
            );
  
            elements.getElement(CardElement)?.clear();
            handleAmountChange(currentParty, "0"); 
            setClientSecret(null); 
  
            if (currentParty < parties - 1) {
              setCurrentParty(currentParty + 1);
            } else {
              router.push("/Success"); 
            }
          }
        } else {
          console.error("Failed to create payment intent", result);
          return;
        }
      } catch (error) {
        console.error("Error processing payment", error);
      }
    };
  
    return (

        <>
          <Navbar currentPage="Payment"/>
        <div className="flex items-center justify-center min-h-screen">
          <div className="container max-w-md mx-auto p-4">
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">
                Party {currentParty + 1}
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Details
                </label>
                <CardElement
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  value={amounts[currentParty]}
                  onChange={(e) =>
                    handleAmountChange(currentParty, e.target.value)
                  } 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={!stripe || !elements}
                >
                  {currentParty < parties - 1
                    ? "Pay & Next Party"
                    : "Pay & Finish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
