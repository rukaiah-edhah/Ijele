import { NextRequest, NextResponse } from 'next/server';
import { createServiceProvider } from '@/db/queries';
import { InsertServiceProvider } from '@/db/schemas';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, companyName, serviceType }: InsertServiceProvider = body;

  try {
    await createServiceProvider({ userId, companyName, serviceType });
    return NextResponse.json({ message: 'Service provider onboarded successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to onboard service provider' }, { status: 500 });
  }
}
