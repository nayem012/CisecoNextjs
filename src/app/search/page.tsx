"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/shared/Pagination/Pagination";
import { apiURL } from "@/lib/config";
import { Product } from "@/data/data";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const page = Number(searchParams.get("page") || 1);

  const { data: response, isLoading } = useQuery({
    queryKey: ["products-search", search, page],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 2000)); // Wait 2 seconds before API call
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", String(page));
      const res = await fetch(`${apiURL}products?${params.toString()}`);
      // console.log("request url:", `${apiURL}products?${params.toString()}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!search,
  });

  const products = response?.data || [];
  const pagination = response?.pagination || { page: 1, pages: 1, total: 0 };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    if (search) params.set("q", search);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container py-16 lg:pb-28 lg:pt-20 space-y-10">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          className="flex-1 border border-primary-300 dark:border-primary-700 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary-600 dark:bg-primary-500 text-white font-semibold shadow-md hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors w-full sm:w-auto"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {products.length ? products.map((item: Product) => (
              <ProductCard data={item} key={item._id} />
            )) : <div className="col-span-full text-center text-gray-500">No products found.</div>}
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
      )}
    </div>
  );
};

export default SearchPage;
