"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import MySwitch from "@/components/MySwitch";
import XClear from "@/components/TabFilters/XClear";
import { useRouter } from "next/navigation";
import {
  DATA_categories,
  PRICE_RANGE,
  DATA_colors,
  DATA_sortOrderRadios,
} from "@/contains/FilterConstants"
import TabFiltersCategories from "@/components/TabFilters/TabFiltersCategories";
import TabFiltersColors from "@/components/TabFilters/TabFiltersColors";
import TabFiltersPriceRange from "@/components/TabFilters/TabFiltersPriceRange";
import TabFiltersSortOrder from "@/components/TabFilters/TabFiltersSortOrder";
import TabFiltersOnSale from "@/components/TabFilters/TabFiltersOnSale";
import TabFiltersMobile from "@/components/TabFilters/TabFiltersMobile";
//
const TabFilters = () => {
  const router = useRouter();
  
  
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //
  const [isOnSale, setIsIsOnSale] = useState(false);
  const [rangePrices, setRangePrices] = useState(PRICE_RANGE);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [colorsState, setColorsState] = useState<string[]>([]);
  // const [sizesState, setSizesState] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");
  
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);


  function handleApplyFilters() {
    const sale = isOnSale ? "true" : "false";
    // console.log("isOnSale", isOnSale);
    const params = new URLSearchParams({
      isOnSale: sale,
      rangePrices: rangePrices.join(','),
      categoriesState: categoriesState.includes("All Categories") ? "" : categoriesState.map(category => category.replace(/ /g, "-").toLowerCase()).join(','),
      colorsState: colorsState.join(','),
      sortOrderStates,
    });
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden lg:flex flex-1 space-x-4">
        <TabFiltersPriceRange
          rangePrices={rangePrices}
          setRangePrices={setRangePrices}
          handleApplyFilters={handleApplyFilters}
        />
        <TabFiltersCategories
          categoriesState={categoriesState}
          setCategoriesState={setCategoriesState}
          handleApplyFilters={handleApplyFilters}
        />
        <TabFiltersColors
          colorsState={colorsState}
          setColorsState={setColorsState}
          handleApplyFilters={handleApplyFilters}
        />
        <TabFiltersOnSale
          isOnSale={isOnSale}
          setIsOnSale={setIsIsOnSale}
          handleApplyFilters={handleApplyFilters}
        />
        <div className="!ml-auto">
          <TabFiltersSortOrder
            sortOrderStates={sortOrderStates}
            setSortOrderStates={setSortOrderStates}
            handleApplyFilters={handleApplyFilters}
          />
        </div>
      </div>
      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex overflow-x-auto lg:hidden space-x-4">
        <TabFiltersMobile
          isOpenMoreFilter={isOpenMoreFilter}
          closeModalMoreFilter={closeModalMoreFilter}
          openModalMoreFilter={openModalMoreFilter}
          rangePrices={rangePrices}
          setRangePrices={setRangePrices}
          categoriesState={categoriesState}
          setCategoriesState={setCategoriesState}
          colorsState={colorsState}
          setColorsState={setColorsState}
          sortOrderStates={sortOrderStates}
          setSortOrderStates={setSortOrderStates}
          isOnSale={isOnSale}
          setIsOnSale={setIsIsOnSale}
          handleApplyFilters={handleApplyFilters}
        />
      </div>
    </div>
  );
};

export default TabFilters;