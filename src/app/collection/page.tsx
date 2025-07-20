"use client";
import React, { FC, Suspense, useEffect } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { apiURL } from "@/lib/config"
// import react-query
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/data/data";

const ProductList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page") || 1);
  const category = searchParams.get("categoryState") || "";

  const { data: response, isLoading } = useQuery({
    queryKey: ["products", searchParams.toString(), category],
    queryFn: async () => {
      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set("categoryState", category);
      }
      if (!params.get("categoriesState") && category) {
        params.set("categoriesState", category);
      }
      const res = await fetch(`${apiURL}products?${params.toString()}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  useEffect(() => {
    const nextPage = page + 1;
    const paramsNext = new URLSearchParams(searchParams.toString());
    paramsNext.set("page", nextPage.toString());
    paramsNext.set("categoryState", category);
    if (!paramsNext.get("categoriesState") && category) {
      paramsNext.set("categoriesState", category);
    }
    queryClient.prefetchQuery({
      queryKey: ["products", paramsNext.toString(), category],
      queryFn: async () => {
        const res = await fetch(`${apiURL}products?${paramsNext.toString()}`);
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      },
    });
  }, [searchParams, page, queryClient, category]);

  const products = response?.data || [];
  const pagination = response?.pagination || { page: 1, pages: 1, total: 0 };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("categoryState", category);
    if (!params.get("categoriesState") && category) {
      params.set("categoriesState", category);
    }
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
        {products.map((item: Product) => (
          <ProductCard data={item} key={item._id} />
        ))}
      </div>
      {pagination.pages > 1 && (
        <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
          <Pagination
            totalPage={pagination.pages}
            currentPage={pagination.page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

const PageCollection = () => {
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
            <TabFilters />
            <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
              <ProductList />
            </Suspense>
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
