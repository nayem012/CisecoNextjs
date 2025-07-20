"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/product";
import Link from "next/link";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
  category?: string;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "max-w-[280px]",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "Our Exclusive Collection",
  category = "all",
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const [isShow, setIsShow] = useState(false);
  const [glideOptions, setGlideOptions] = useState<Partial<Glide.Options>>({});

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products-slider", category],
    queryFn: async () => {
      const res = await getProducts({ limit: 8, page: 1, category });
      return res.data || [];
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  useEffect(() => {
    if (!products.length || !sliderRef.current) return;

    const newOptions: Partial<Glide.Options> = {
      perView: Math.min(4, products.length),
      gap: 32,
      bound: products.length > 4,
      peek: products.length > 4 ? 0 : { before: 40, after: 40 },
      breakpoints: {
        1280: {
          perView: Math.min(4, products.length) - (products.length > 2 ? 1 : 0),
          peek: products.length > 4 ? 0 : { before: 30, after: 30 }
        },
        1024: {
          perView: Math.min(3, products.length),
          gap: 20,
          peek: products.length > 3 ? 0 : { before: 30, after: 30 }
        },
        768: {
          perView: Math.min(2, products.length),
          gap: 20,
          peek: products.length > 2 ? 0 : { before: 20, after: 20 }
        },
        640: {
          perView: 1.2,
          gap: 20,
          peek: { before: 20, after: 20 }
        },
      }
    };

    setGlideOptions(newOptions);
    const slider = new Glide(sliderRef.current, newOptions);
    slider.mount();
    setIsShow(true);

    return () => slider.destroy();
  }, [products.length, sliderRef.current]);

  if (isLoading) {
    return (
      <div className={`nc-SectionSliderProductCard ${className}`}>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-300 rounded w-1/3 mb-8"></div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[280px]">
                <div className="rounded-lg bg-gray-300 h-96 w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mt-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`nc-SectionSliderProductCard ${className}`}>
        <div className="text-red-500">
          Error when fetching data
        </div>
      </div>
    );
  }

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev={products.length > 4}
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {products.map((item: Product) => (
              <li key={`${id}-${item._id}`} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-6">
            <Link
            href={`/collection?categoryState=${category==='all' ? '' : category}`}
            className="inline-block px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow-md hover:bg-primary-700 transition-colors text-sm md:text-base w-full max-w-xs text-center"
            >
            View All {heading || category}
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;