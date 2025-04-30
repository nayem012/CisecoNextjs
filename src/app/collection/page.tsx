"use client";
import React, { FC, Suspense } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { apiURL } from "@/lib/config"
// import react-query
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Product } from "@/data/data";
const PageCollection = ({}) => {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const page = searchParams.get("page") || "1";
  // const sort = searchParams.get("sort") || "latest";
  // const category = searchParams.get("category") || "all";
  // const search = searchParams.get("search") || "";
  // const filter = searchParams.get("filter") || "all";
  const { data: products, isLoading } = useQuery({
    // queryKey: ["products", { page, sort, category, search, filter }],
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        // `${apiURL}products?page=${page}&sort=${sort}&category=${category}&search=${search}&filter=${filter}`
        `${apiURL}products`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const {data} = await res.json();
      // console.log("products", data);
      return data;
    }}
  );
  if (isLoading) {
    return <div className="text-center">
      <svg
        className="animate-spin h-5 w-5 text-gray-900 dark:text-white mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"
        />
        <path
          fill="currentColor"
          d="M12.5,6.5h-1v7h1Zm0,9h-1v1h1Z"
        />
      </svg>
    </div>;
  }
  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              All collection
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            {/* <TabFilters /> */}

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {/* {products.map((item :Product) => (
                <ProductCard data={item} key={item._id} />
              ))} */}
              <Suspense fallback={<div className="text-center">
                <svg
                  className="animate-spin h-5 w-5 text-gray-900 dark:text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"
                  />
                  <path

                    fill="currentColor"
                    d="M12.5,6.5h-1v7h1Zm0,9h-1v1h1Z"
                  />
                </svg>
              </div>}>
                {products.map((item: Product) => (
                  <ProductCard data={item} key={item._id} />
                ))}
              </Suspense>
            </div>

            {/* PAGINATION */}
            {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination 
                totalPage={Number(products.totalPage)}
                currentPage={Number(page)}
                onPageChange={(page: Number) => {
                  router.push(`/collection?page=${page}`);
                }}
              />
              <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div> */}
          </main>
        </div>

        
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* <SectionSliderCollections /> */}
        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

        
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageCollection;
