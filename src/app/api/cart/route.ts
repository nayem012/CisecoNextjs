import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received cart data:', body);

    // Respond with success
    return NextResponse.json({ message: 'Cart synced successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error syncing cart:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
