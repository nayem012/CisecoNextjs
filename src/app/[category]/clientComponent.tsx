'use client';
import Pagination from "@/shared/Pagination/Pagination";
import ProductCard from "@/components/ProductCard";
// import TabFilters from "@/components/TabFilters";
import { apiURL } from "@/lib/config";
import { Product } from "@/data/data";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const ProductList = ({ category }: { category: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page") || 1);

  const { data: response, refetch } = useQuery({
    queryKey: ["products", searchParams.toString(), category],
    queryFn: async () => {
      const params = new URLSearchParams(searchParams.toString());
      // Always set categoryState param to the current category
      // if (category) {
      //   params.set("categoryState", category);
      // }
      // If categoriesState is not set, set it to the current category for default filter
      if (!params.get("categoriesState") && category) {
        params.set("categoriesState", category);
      }
      // If the URL does not already have categoryState or categoriesState, update the URL
      if (searchParams.get("categoryState") !== category || !searchParams.get("categoriesState")) {
        router.replace(`?${params.toString()}`);
      }
    //   console.log("request url:", `${apiURL}products?${params.toString()}`);
      const res = await fetch(`${apiURL}products?${params.toString()}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });
//   console.log(category, "category from ProductList");
  useEffect(() => {
    const nextPage = page + 1;
    const paramsNext = new URLSearchParams(searchParams.toString());
    paramsNext.set("page", nextPage.toString());
    // console.log("req url:", `${apiURL}products?${paramsNext.toString()}`);
    queryClient.prefetchQuery({
      queryKey: ["products", paramsNext.toString(), category],
      queryFn: async () => {
        const res = await fetch(`${apiURL}products?${paramsNext.toString()}`);
        // console.log("request url prefetch" + `${apiURL}products?${paramsNext.toString()}`);
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      },
    });
  }, [searchParams, page, queryClient, category]);

  useEffect(() => {
    refetch();
  }, [category, searchParams, refetch]);

  const products = response?.data || [];
  const pagination = response?.pagination || { page: 1, pages: 1, total: 0 };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    // Always set categoryState to current category for correct filtering
    params.set("categoryState", category);
    router.push(`?${params.toString()}`);
  };

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

export default ProductList;