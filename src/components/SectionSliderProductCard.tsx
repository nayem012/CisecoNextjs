"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product } from "@/data/data";
import {
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query"
import { getProducts } from "@/lib/api/product";
import Image from "next/image";
export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
}) => {
  const sliderRef = useRef(null);

  //
  const [isShow, setIsShow] = useState(false);
  // const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProducts(10, 1);
      return response.data;
    },
    select: (res) => res
  });
  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);
  if (isLoading) return (<div>
    {/* loading animation */}
    <div className="flex flex-wrap justify-center">
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-bounce m-2"></div>
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-bounce m-2"></div>
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-bounce m-2"></div>
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-bounce m-2"></div>
    </div>
  </div>);
  if (isError) {
    // console.log("Error", isError);
    return <div>Error...</div>
  };
  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : ""}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data && data.map((item: Product , index: number) => (
              <li key={index} className={`glide__slide  ${itemClassName}`}>
                <ProductCard data={item} className="h-96 w-96" />
                {/* <p className="text-rose-950">{item.name}</p> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    // <div>
    //   {data && data.map((item: Product, index: number) => (
    //     <div key={index}>
    //       <p className="text-rose-950">{item.name}</p>
    //       <Image
    //         src={item.images[0]}
    //         alt={item.name}
    //         width={200}
    //         height={200}
    //       />
    //     </div>
    //   ))}
    // </div>
  );
};

export default SectionSliderProductCard;
