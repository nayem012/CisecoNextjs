import { apiURL } from "@/lib/config";
export async function getProducts(limit: number = 10, page: number = 1): Promise<any> {
    const res = await fetch(`/api/products?limit=${limit}&page=${page}`);
    return res.json();
}
