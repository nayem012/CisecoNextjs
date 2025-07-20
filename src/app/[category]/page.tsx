import React, { Suspense } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { apiURL } from "@/lib/config";
import { Product } from "@/data/data";
import ProductList from "./clientComponent";

// Server component can be async
const PageCategory = async ({ params }: {
   params: Promise<{ category: string | string[] }>
  }) => {
  const rawCategory = (await params).category || "all";
  const category = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;

  return (
    <div className="nc-PageCategory">
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {`${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Collection`}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Find your favorite {`${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}. Explore the latest trends and styles in our {`${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`} collection. Discover unique pieces that reflect your personal style and elevate your wardrobe.
            </span>
          </div>
          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            <TabFilters />
            <Suspense
              fallback={
                <div className="flex w-52 flex-col gap-4">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              }
            >
              <ProductList category={category} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageCategory;