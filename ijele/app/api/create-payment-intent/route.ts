import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  const { amount, currency } = await req.json();

  if (!amount || !currency) {
    return NextResponse.json({ error: 'Amount and currency are required' }, { status: 400 });
  }

  try {
    // Convert amount to cents
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 201 });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
