import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/db/queries';
import { InsertUser } from '@/db/schemas';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password }: InsertUser = body;

  try {
    await createUser({ name, email, password });
    return NextResponse.json({ message: 'User onboarded successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to onboard user' }, { status: 500 });
  }
}
