export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

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
