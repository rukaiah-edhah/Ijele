import { NextRequest, NextResponse } from "next/server";
import getFlightOffersPrice from "@/lib/flight/getFlightOffersPricing";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const flightOffersData = await request.json();
    const pricingResponse = await getFlightOffersPrice(flightOffersData);
    return NextResponse.json(pricingResponse);
  } catch (error: any) {
    console.error("Error fetching flight offers pricing:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch flight offers pricing",
        details: error.response ? error.response.data : error.message,
      },
      { status: 500 }
    );
  }
}