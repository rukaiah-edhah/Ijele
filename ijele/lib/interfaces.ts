// Token response interface
import { Key } from "react";

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

// Combined Hotel Interface ✈️

export interface GeoCode {
  latitude: number;
  longitude: number;
}

export interface Address {
  countryCode: string;
}

export interface RoomDescription {
  text: string;
  lang: string;
}

export interface RoomTypeEstimated {
  category: string;
  beds: number;
  bedType: string;
}

export interface Room {
  type: string;
  typeEstimated: RoomTypeEstimated;
  description: RoomDescription;
}

export interface Guests {
  adults: number;
}

export interface Price {
  currency: string;
  base: string;
  total: string;
}

export interface CancellationPolicy {
  deadline: string;
  amount: string;
}

export interface Policies {
  cancellations: CancellationPolicy[];
  paymentType: string;
}

export interface Offer {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  rateCode: string;
  room: Room;
  guests: Guests;
  price: Price;
  policies: Policies;
  self: string;
}

export interface Hotel {
  type: string;
  hotelId: string;
  chainCode: string;
  dupeId: string;
  name: string;
  cityCode: string;
  latitude: number;
  longitude: number;
  geoCode: GeoCode;
  address: Address;
  lastUpdate?: string;
  offers: Offer[];
  available: boolean;
}

export interface HotelDataResponse {
  data: Hotel[];
}

export interface HotelOffer {
  hotel: Hotel;
  offers: Offer[];
}

export interface HotelOffersResponse {
  data: HotelOffer[];
}

export interface GuestInfo {
  tid: number;
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface PaymentCardInfo {
  vendorCode: string;
  cardNumber: string;
  expiryDate: string;
  holderName: string;
}

export interface PaymentInfo {
  method: string;
  paymentCard: {
    paymentCardInfo: PaymentCardInfo;
  };
}

export interface RoomAssociation {
  guestReferences: { guestReference: string }[];
  hotelOfferId: string;
}

export interface BookingRequest {
  data: {
    type: string;
    guests: GuestInfo[];
    travelAgent: {
      contact: {
        email: string;
      };
    };
    roomAssociations: RoomAssociation[];
    payment: PaymentInfo;
  };
}

export interface BookingResponse {
  data: {
    type: string;
    id: string;
    hotelBookings: {
      type: string;
      id: string;
      bookingStatus: string;
      hotelProviderInformation: {
        hotelProviderCode: string;
        confirmationNumber: string;
      }[];
      hotelOffer: {
        id: string;
        type: string;
        checkInDate: string;
        checkOutDate: string;
        guests: { adults: number };
        price: {
          total: string;
        };
      };
      hotel: {
        hotelId: string;
        name: string;
      };
    }[];
    guests: GuestInfo[];
  };
}

// Location search interface
export interface LocationData {
  subType: string;
  name: string;
  iataCode: string;
  address: {
    cityName: string;
    countryCode: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };
}

export interface LocationSearchResponse {
  data: LocationData[];
}

// Flight search interface
export interface Flight {
  id: Key | null | undefined;
  origin: string;
  destination: string;
  departDate: string;
  adults: string;
  returnDate: string;
}

export interface FlightDataResponse {
  data: Flight[];
}

// Flight Offers Price interface
enum FeeType {
  TICKETING = "TICKETING",
  SERVICE = "SERVICE",
  SHIPPING = "SHIPPING",
}

export interface Fee {
  amount: string;
  type: FeeType;
}

export interface FlightOffersPrice {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
}

// Flight Create Order API interface
export interface FlightOrderRequest {
  data: {
    type: string;
    flightOffers: any[];
    travelers: Traveler[];
    // documents: Document[];   Document[] is inside Traveler[]
    remarks?: Remark[];
    ticketingAgreement?: TicketingAgreement;
    contacts?: Contact[];
  };
}

export interface Phone {
  deviceType: string;
  countryCallingCode: string;
  number: string;
}


// Traveler interface
export interface Traveler {
  dateOfBirth: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: string;
  contact: {
    emailAddress: string;
    phones: Phone[];
  };
  documents?: Documents[];
}

// Document interface
export interface Documents {
  documentType: string;
  birthPlace: string;
  issuanceLocation: string;
  issuanceDate: string;
  number: string;
  expiryDate: string;
  issuanceCountry: string;
  validityCountry: string;
  nationality: string;
  holder: boolean;
}

// Remark interface
export interface Remark {
  subType: string;
  text: string;
}

// TicketingAgreement interface
export interface TicketingAgreement {
  option: string;
  delay: string;
}

// Contact interface
export interface Contact {
  addresseeName: {
    firstName: string;
    lastName: string;
  };
  companyName: string;
  purpose: string;
  phones: Phone[];
  emailAddress: string;
  address: {
    lines: string[];
    postalCode: string;
    cityName: string;
    countryCode: string;
  };
}

export interface FlightOrderResponse {
  data: {
    type: string,
    id: string,
    queuingOfficeId: string,
    associatedRecords: [
      {
        reference: string,
        creationDateTime: number,
        originSystemCode: string,
        flightOfferId: number
      }
    ]}
}
