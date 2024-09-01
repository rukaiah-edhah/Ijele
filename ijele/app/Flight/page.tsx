"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import SearchNav from "@/components/SearchPage/search-nav";
import FlightList from "@/components/Flight/FlightList";
import TravelerDetailForm from "@/components/Flight/TravelerDetailForm";
import { Flight } from "@/components/Flight/FlightType";
import { useRouter } from "next/navigation";
import FlightSideBar from "@/components/SearchPage/flight-sidebar";
import createFlightOrder from "@/lib/flight/bookFlight";
import { useCart } from "@/components/Payment/cartContent";
import LocationSearch from "@/components/HotelListPage/LocationSearch";
import styles from '@/components/Flight/FlightPage.module.css';
import { HotelSideBar } from "@/components/SearchPage/hotel-sidebar";
import FlightFilterSection from "@/components/SearchPage/flight-sidebar";
import { AutoCarousel } from "@/components/SearchPage/carousel";
import { flightCarouselImages, hotelCarouselImages } from "@/components/ImageMapping";

const FlightPage: React.FC = () => {
  const router = useRouter();
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [adults, setAdults] = useState<string>("1");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [resultsPop, setResultsPopulated] = useState(false); // ADDED FOR HIDING CAROUSEL
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    iataCode: string;
  } | null>(null);
  const [travelerDetails, setTravelerDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    deviceType: "",
    countryCallingCode: "",
    number: "",
    dateOfBirth: "",
    documentType: "",
    birthPlace: "",
    issuanceLocation: "",
    issuanceDate: "",
    passportNumber: "",
    passportExpiryDate: "",
    passportIssuanceCountry: "",
    validityCountry: "",
    nationality: "",
    holder: true,
  });

  const [error, setError] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState<
    "notStarted" | "booked" | "error"
  >("notStarted");
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const { addToCart } = useCart();

  const fetchFlights = async () => {
    try {
      const response = await axios.get("/api/flights/search", {
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate,
          returnDate,
          adults,
        },
      });
      setFlights(response.data.data);
      setError(null); // Clear any previous errors
      setSearchPerformed(true); // Mark that a search has been performed
      setResultsPopulated(true); {/*ADDED FOR HIDING CAROUSEL*/ }

    } catch (err: any) {
      console.error(err); // Logging the full error for debugging
      setFlights([]); // Clear the flights list on error
      setError(err.response ? err.response.data : err.message);
      setSearchPerformed(true); // Mark that a search has been performed
      setResultsPopulated(false); {/*ADDED FOR HIDING CAROUSEL*/ }

    }
  };

  const handleSearch = (
    origin: string,
    destination: string,
    departureDate: string,
    returnDate: string,
    adults: string
  ) => {
    setOrigin(origin);
    setDestination(destination);
    setDepartureDate(departureDate);
    setReturnDate(returnDate);
    setAdults(adults);
    fetchFlights();
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFlight) {
      alert("Please select a flight.");
      return;
    }

    try {
      const bookingDetails = {
        data: {
          type: "flight-order",
          flightOffers: [selectedFlight],
          travelers: [
            {
              id: "1",
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
                    deviceType: "MOBILE".toUpperCase(),
                    countryCallingCode: travelerDetails.countryCallingCode,
                    number: travelerDetails.number,
                  },
                ],
              },
              documents: [
                {
                  documentType: "PASSPORT".toUpperCase(),
                  birthPlace: travelerDetails.birthPlace,
                  issuanceLocation: travelerDetails.issuanceLocation,
                  issuanceDate: travelerDetails.issuanceDate,
                  number: travelerDetails.passportNumber,
                  expiryDate: travelerDetails.passportExpiryDate,
                  issuanceCountry:
                    travelerDetails.passportIssuanceCountry.toUpperCase(),
                  validityCountry:
                    travelerDetails.validityCountry.toUpperCase(),
                  nationality: travelerDetails.nationality.toUpperCase(),
                  holder: travelerDetails.holder,
                },
              ],
            },
          ],
          ticketingAgreement: {
            option: "DELAY_TO_CANCEL",
            delay: "6D",
          },
          remarks: {
            general: [
              {
                subType: "GENERAL_MISCELLANEOUS",
                text: "ONLINE BOOKING FROM INCREIBLE VIAJES",
              },
            ],
          },
          contacts: [
            {
              addresseeName: {
                firstName: "PABLO",
                lastName: "RODRIGUEZ",
              },
              companyName: "INCREIBLE VIAJES",
              purpose: "STANDARD",
              phones: [
                {
                  deviceType: "LANDLINE",
                  countryCallingCode: "34",
                  number: "480080071",
                },
                {
                  deviceType: "MOBILE",
                  countryCallingCode: "33",
                  number: "480080072",
                },
              ],
              emailAddress: "support@increibleviajes.es",
              address: {
                lines: ["Calle Prado, 16"],
                postalCode: "28014",
                cityName: "Madrid",
                countryCode: "ES",
              },
            },
          ],
        },
      };

      const response = await axios.post("/api/flights/book", bookingDetails);
      setBookingStatus("booked");
      alert("Flight booked successfully!");

      if (selectedFlight) {
        addToCart({
          id: selectedFlight.id.toString(),
          type: "flight",
          details: selectedFlight,
          itineraries: [],
          price: parseFloat(selectedFlight.price.total),
        });
        console.log(selectedFlight);
        alert("Flight added to cart!");
        alert("Redirecting to Cart page!");
        router.push("/Cart");
      }

      setSelectedFlight(null); // Clear the selected flight
    } catch (err: any) {
      alert("Failed to book flight. Please try again.");
    }
  };

  const handlePayNow = () => {
    router.push("Payment");
    alert("Redirecting to payment page...");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onBookFlight = async (flight: Flight) => {
    try {
      const bookingDetails = {
        flightId: flight.id,
        // Add any other necessary booking parameters here
      };
      const response = await axios.post("/api/flights/book", bookingDetails);
      alert("Flight booked successfully!");
    } catch (err) {
      alert("Failed to book flight. Please try again.");
    }
  };

  const handleAddToCart = () => {
    if (selectedFlight) {
      addToCart({
        id: selectedFlight.id,
        type: "flight",
        details: selectedFlight,
        price: 0,
      });
      alert("Flight added to cart!");
    }
  };

  function isVisible() {
    {/*ADDED FOR HIDING CAROUSEL*/ }
    return resultsPop ? false : true
  }

  return (
    <div>
      <Navbar currentPage="Flight" />
      <SearchNav currentPage="Flight" />
      <div className={styles.background}>
        <div className="flex">
          <div className=" flex-grow">
            <div className="sticky top-0"> {/*contianer for side bar AND CAROUSEL */}
              {/* carousel container */}
              <div className="absolute max-h-auto ">
                {AutoCarousel(flightCarouselImages, 'hotelCarouselID', 3500, isVisible())}
              </div>
              {/*contianer for side bar */}
              <div className='max-h-screen overflow-auto sidebar-container no-scrollbar'>
                <h1 className="text-3xl text-center text-lg font-bold font-junge m-4 text-ijele_cream"> - Where would you like to go? - </h1>

                {/* location & destination search */}
                <div className="flex justify-center p-4 items-center space-x-2 text-sm">
                  <div className="flex">
                    <button
                      type="submit"
                      onClick={fetchFlights}
                      className="justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF6EE"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    </button>

                    {/* Input for origin */}
                    <LocationSearch
                      type="origin"
                      onSelect={(location) => setOrigin(location.iataCode)}
                    />
                  </div>

                  {/* input for destination */}
                  <div className="pr-2">
                    <LocationSearch
                      type="destination"
                      onSelect={(location) => setDestination(location.iataCode)}
                    />
                  </div>

                  {/* input number of people */}
                  <div className='flex items-center bg-ijele_cream rounded-lg w-1/3'>
                    <input
                      type="number"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      min="1"
                      className='sidebar-inputfield w-full h-4 rounded-md focus:outline-none'
                    />
                    <i className="fa-solid fa-user fa-sm pr-2 font-black" />
                  </div>
                </div>

                <div className="flex items-center justify-evenly place-items-center text-base text-ijele_cream font-ijele_cream border-b p-4 pt-0">
                  {/* input dates depart */}
                  <div className="flex-col  w-[45%]">
                    <label>Enter departure date</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="sidebar-inputfield bg-ijele_teal w-full max-w-md"
                    />
                  </div>

                  {/* input dates return */}
                  <div className="flex-col  w-[45%] ">
                    <label>Enter return date</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="sidebar-inputfield bg-ijele_teal w-full max-w-md"
                    />
                  </div>

                </div>
                <FlightFilterSection />
              </div>
            </div>

            <div >

              <div className="float-left ml-[10%] max-w-70%">
                {/* Container for results and traveler details */}
                <div className="mb-6">
                  {searchPerformed && flights.length === 0 ? (
                    <p className="text-red-500">No flights found</p>
                  ) : (
                    flights && Array.isArray(flights) && flights.length > 0 && (
                      <FlightList
                        flights={flights}
                        onSelectFlight={(flight) => setSelectedFlight(flight)}
                      />
                    )
                  )}
                </div>

                {flights.length > 0 && selectedFlight && (
                  <div className="flex flex-col items-center mt-6">
                    <form onSubmit={handleBooking}>
                      <TravelerDetailForm
                        travelerDetails={travelerDetails}
                        handleInputChange={handleInputChange}
                      />
                      <button type="submit" className="btn btn-primary mt-2">
                        Book Flight
                      </button>
                    </form>
                  </div>
                )}
              </div>

            </div>
          </div>

          {error && (
            <div className="mt-6 text-red-500">
              <p>{typeof error === 'string' ? error : JSON.stringify(error)}</p>
            </div>
          )}

          {bookingStatus === "booked" && (
            <div className="mt-6">
              <p className="text-green-500">Flight booked successfully!</p>
              <button onClick={handlePayNow} className="btn btn-primary mt-2">
                Pay Now
              </button>
              <button
                onClick={handleAddToCart}
                className="btn btn-secondary mt-2 ml-4"
              >
                Add to Cart
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 text-red-500">
              <p>{typeof error === 'string' ? error : JSON.stringify(error)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightPage;