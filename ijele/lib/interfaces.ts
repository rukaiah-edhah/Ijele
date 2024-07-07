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

// Hotel Search API interfaces

export interface HotelOffer {
  id: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface HotelOffersResponse {
  data: HotelOffer[];
}
export interface GuestContact {
  phone: string;
  email: string;
}

export interface GuestInfo {
  name: string;
  surname: string;
  contact: GuestContact;
}

export interface CardInfo {
  vendorCode: string;
  cardNumber: string;
  expiryDate: string;
}

export interface PaymentInfo {
  method: string;
  card: CardInfo;
}

export interface BookingResponse {
  confirmationNumber: string;
  status: string;
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
