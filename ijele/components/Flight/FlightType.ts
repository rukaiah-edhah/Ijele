export type Flight = {
    id: string;
    numberOfBookableSeats: number;
    itineraries: Array<{
      duration: string;
      segments: Array<{
        departure: { iataCode: string; at: string };
        arrival: { iataCode: string; at: string };
        carrierCode: string;
        number: string;
        aircraft: { code: string };
        operating?: { carrierCode: string };
        duration: string;
        numberOfStops: number;
      }>;
    }>;
    price: {
      total: string;
      currency: string;
      base: string;
      grandTotal: string;
    };
    pricingOptions: {
      includedCheckedBagsOnly: boolean;
    };
    validatingAirlineCodes: string[];
    travelerPricings: Array<{
      travelerId: string;
      fareOption: string;
      travelerType: string;
      price: {
        total: string;
        currency: string;
        base: string;
      };
      fareDetailsBySegment: Array<{
        cabin: string;
        includedCheckedBags?: { quantity: number };
      }>;
    }>;
  };