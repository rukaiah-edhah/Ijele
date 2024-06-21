// Token response interface

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

// Hotel List API interfaces

export interface GeoCode {
  latitude: number;
  longitude: number;
}

export interface Address {
  countryCode: string;
}

export interface Hotel {
  chainCode: string;
  iataCode: string;
  dupeId: number;
  name: string;
  hotelId: string;
  geoCode: GeoCode;
  address: Address;
  lastUpdate: string;
}

export interface HotelDataResponse {
  data: Hotel[];
}

// Hotel Booking API interfaces

export interface GuestInfo {
  name: string;
  age: number;
}

export interface PaymentInfo {
  method: string;
  cardNumber: string;
}

export interface BookingResponse {
  confirmationNumber: string;
  status: string;
}
