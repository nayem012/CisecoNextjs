import type { Metadata } from 'next';
import { Product } from "@/data/data";
import ProductDetailComponent from "./client";
import { siteName, siteDescription, siteUrl, apiURL } from '@/lib/config';
interface Props {
  params: { id: string };
}
async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${apiURL}products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // console.log(res);
  if (!res.ok) {
    return null;
  }
  
  const product: Product = await res.json();

  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const product: Product | null = await getProductById(params.id);
  if (!product) {
    return {
      title: 'Product Not Found | ' + siteName,
      description: 'The product you are looking for could not be found.',
    };
  }
  if(!product){
    return {
      title: 'Product Not Found | ' + siteName,
      description: 'The product you are looking for could not be found.',
    };
  }
  const { _id, metaTitle, metaDescription, images } = product;
  const ogImage = images?.[0] ?? '/og.png';
  const productUrl = `${siteUrl}/product-detail/${_id}`;

  return {
    title: `${metaTitle} | ${siteName}`,
    description: metaDescription || siteDescription,
    openGraph: {
      title: `${metaTitle} | ${siteName}`,
      description: metaDescription || siteDescription,
      url: productUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${metaTitle} | ${siteName}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metaTitle} | ${siteName}`,
      description: metaDescription || siteDescription,
      images: [ogImage],
    },
  };
}
export const revalidate = 300;
export default async function ProductDetailPage({ params }: Props) {
  const initialProduct: Product = await getProductById(params.id) as Product;

  // Fire view content event for analytics/ads
  

  return (
    <div>
      <ProductDetailComponent initialProduct={initialProduct} />
    </div>
  );
}
