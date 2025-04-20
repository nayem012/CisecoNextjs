import { NextResponse } from 'next/server';
import { apiURL } from "@/lib/config";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // send the body to the {apiURL}/orders endpoint
    const res = await fetch(`${apiURL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error }, { status: res.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Error syncing cart:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
