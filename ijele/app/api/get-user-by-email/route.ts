import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/db/queries';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const user = await getUserByEmail(email);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}