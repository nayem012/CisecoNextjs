import { apiURL } from "@/lib/config";
export async function getProducts({ limit = 10, page = 1, category = "" }: { limit?: number; page?: number; category?: string }): Promise<any> {
    const res = await fetch(`${apiURL}products?limit=${limit}&page=${page}&category=${category}`);
    return res.json();
}
