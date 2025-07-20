import { config } from "dotenv";

config();

import { NextResponse } from "next/server";

import { meta_conversion_accessToken, PIXEL_ID } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Facebook Conversion API expects an array of events
    // Example body: { event_name, event_time, user_data, custom_data, action_source }
    const events = [
      {
        event_name: body.event_name,
        event_time: body.event_time || Math.floor(Date.now() / 1000),
        user_data: body.user_data,
        custom_data: body.custom_data,
        action_source: body.action_source || "website",
      },
    ];
    const payload = {
      data: events,
      access_token: meta_conversion_accessToken,
    };

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: error?.toString() }, { status: 500 });
  }
}

