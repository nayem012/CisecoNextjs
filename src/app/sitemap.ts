// app/sitemap.ts
import { MetadataRoute } from 'next';
import { apiURL, siteUrl } from '@/lib/config';
import { Product } from '@/data/data';
async function getAllProducts() {
    const res = await fetch(`${apiURL}products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        return [];
    }
    const products = await res.json();
    return products;
}

// 1. Force on-demand regeneration so new products appear immediately
export const dynamic = 'force-dynamic';

// 2. (Optional) Cache the sitemap for 60s at the edge
export const revalidate = 60; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;

  // 3. Fetch only the fields you need (_id and updatedAt)
  const products = await getAllProducts(); 

  // 4. Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/collection`, lastModified: new Date() },
    // about, policy
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/policy`, lastModified: new Date() },
  ];

  // 5. Dynamic product pages
  const productRoutes: MetadataRoute.Sitemap = products.map((p: Product) => ({
    url: `${baseUrl}/product-detail/${p._id}`,
    lastModified: new Date(p.updatedAt ?? new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
