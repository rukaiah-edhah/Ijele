import { NextRequest, NextResponse } from "next/server";
import locationSearch from "@/lib/locationSearch";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const suggestions = await locationSearch(query);
    return NextResponse.json(suggestions);
  } catch (error: any) {
    console.error("Error fetching location suggestions:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch location suggestions",
        details: error.response ? error.response.data : error.message,
      },
      { status: 500 }
    );
  }
}
