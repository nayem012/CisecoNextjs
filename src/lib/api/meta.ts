"use server";
import { headers } from "next/headers";
export async function getIPAddress() {
    return headers().get("x-forwarded-for");
}
export async function getUserAgent() {
    return headers().get("user-agent");
}
export async function getAcceptLanguage() {
    return headers().get("accept-language");
}
export async function getReferer() {
    return headers().get("referer");
}
export async function getHost() {
    return headers().get("host");
}
// /api/meta
// POST:/api/meta method to send pageView event
export async function pageViewServer(location: string){
    const ip = await getIPAddress();
    const userAgent = await getUserAgent();
    const acceptLanguage = await getAcceptLanguage();
    const referer = await getReferer();
    const host = await getHost();

    /**
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
     */
    const body = {
        event_name: "PageView",
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
            ip_address: ip,
            user_agent: userAgent,
            accept_language: acceptLanguage,
            referer: referer,
            host: host
        },
        custom_data: {
            location: location
        },
        action_source: "website"
    };
    const response = await fetch("/api/meta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error(`Failed to send page view event: ${response.statusText}`);
    }
}

