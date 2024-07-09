    import { NextRequest, NextResponse } from 'next/server';
    import flightOffersPricing from '@/lib/flight/getFlightOffersPricing';

    export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const pricingResponse = await flightOffersPricing();
        return NextResponse.json(pricingResponse);
    } catch (error: any) {
        console.error('Error fetching flight offers pricing:', error);
        return NextResponse.json(
        {
            error: 'Failed to fetch flight offers pricing',
            details: error.response ? error.response.data : error.message,
        },
        { status: 500 }
        );
    }
    }
