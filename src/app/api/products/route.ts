//api/products/route.ts
import { NextResponse } from 'next/server';

import { apiURL } from "@/lib/config";

export async function GET(request: Request) {
    // console.log(request, "request from api");
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    if (ids) {
        // run a loop to get all the ids and fetch them
        const idsArray = ids.split(',');
        const promises = idsArray.map(async (id) => {
            const res = await fetch(`${apiURL}products/${id}`);
            // console.log(res, "res from apiiiiii");
            return res.json();
        });
        const data = await Promise.all(promises);
        // console.log(data, "data from api");
        return NextResponse.json(data);
    }
    const limit = searchParams.get('limit') || 10;
    const page = searchParams.get('page') || 1;
    const res = await fetch(`${apiURL}products?limit=${limit}&page=${page}`);
    const data = await res.json();
    return NextResponse.json(data);
}