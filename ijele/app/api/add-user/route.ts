import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/db/queries';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, userId } = body;

  try {
    console.log('Received data:', { name, email, userId }); 
    await createUser({ name, email, userId });
    return NextResponse.json({ message: 'User onboarded successfully' }, { status: 201 });
  } catch (error: any) {
    console.error('Error during onboarding:', error); 
    return NextResponse.json({ error: 'Failed to onboard user', details: error.message }, { status: 500 });
  }
}