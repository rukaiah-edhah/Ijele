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

// Hotel Booking API interfaces

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
