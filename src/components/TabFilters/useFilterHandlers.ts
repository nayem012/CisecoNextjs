import { useRouter } from "next/navigation";
import { PRICE_RANGE } from "@/contains/FilterConstants";

export const useFilterHandlers = () => {
  const router = useRouter();

  const handleApplyFilters = (
    isOnSale: boolean,
    rangePrices: number[],
    categoriesState: string[],
    colorsState: string[],
    sortOrderStates: string
  ) => {
    const params = new URLSearchParams({
      isOnSale: String(isOnSale),
      rangePrices: rangePrices.join(','),
      categoriesState: categoriesState.includes("All Categories") ? "" : categoriesState.join(','),
      colorsState: colorsState.join(','),
      sortOrderStates,
    });
    router.push(`?${params.toString()}`);
  };

  return { handleApplyFilters };
};

export type FilterState = {
  isOnSale: boolean;
  rangePrices: number[];
  categoriesState: string[];
  colorsState: string[];
  sortOrderStates: string;
};

export const INITIAL_FILTER_STATE = {
  isOnSale: false,
  rangePrices: PRICE_RANGE,
  categoriesState: [],
  colorsState: [],
  sortOrderStates: "",
};