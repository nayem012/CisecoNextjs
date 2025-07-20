import React, { Fragment } from "react";
import { Dialog, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import MySwitch from "@/components/MySwitch";
// import XClear from "@/components/TabFilters/XClear";
import { AdjustmentsHorizontalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  DATA_categories,
  PRICE_RANGE,
  DATA_colors,
  DATA_sortOrderRadios,
} from "@/contains/FilterConstants";

interface TabFiltersMobileProps {
  isOpenMoreFilter: boolean;
  closeModalMoreFilter: () => void;
  openModalMoreFilter: () => void;
  rangePrices: number[];
  setRangePrices: (range: number[]) => void;
  categoriesState: string[];
  setCategoriesState: (categories: string[]) => void;
  colorsState: string[];
  setColorsState: (colors: string[]) => void;
  sortOrderStates: string;
  setSortOrderStates: (sort: string) => void;
  isOnSale: boolean;
  setIsOnSale: (onSale: boolean) => void;
  handleApplyFilters: () => void;
}

const renderMoreFilterItem = (
  data: {
    name: string;
    description?: string;
    defaultChecked?: boolean;
  }[],
) => {
  const list1 = data.filter((_, i) => i < data.length / 2);
  const list2 = data.filter((_, i) => i >= data.length / 2);
  return (
    <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
      <div className="flex flex-col space-y-5">
        {list1.map((item) => (
          <Checkbox
            key={item.name}
            name={item.name}
            subLabel={item.description}
            label={item.name}
            defaultChecked={!!item.defaultChecked}
          />
        ))}
      </div>
      <div className="flex flex-col space-y-5">
        {list2.map((item) => (
          <Checkbox
            key={item.name}
            name={item.name}
            subLabel={item.description}
            label={item.name}
            defaultChecked={!!item.defaultChecked}
          />
        ))}
      </div>
    </div>
  );
};

const TabFiltersMobile: React.FC<TabFiltersMobileProps> = ({
  isOpenMoreFilter,
  closeModalMoreFilter,
  openModalMoreFilter,
  rangePrices,
  setRangePrices,
  categoriesState,
  setCategoriesState,
  colorsState,
  setColorsState,
  sortOrderStates,
  setSortOrderStates,
  isOnSale,
  setIsOnSale,
  handleApplyFilters,
}) => (
  <div className="flex-shrink-0">
    <div
      className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
      onClick={openModalMoreFilter}
    >
      <AdjustmentsHorizontalIcon className="w-4 h-4" />
      <span className="ml-2">Products filters (3)</span>
      <XCircleIcon className="w-4 h-4 ml-3" />
    </div>
    <Transition appear show={isOpenMoreFilter} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModalMoreFilter}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            className="inline-block h-screen w-full max-w-4xl"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
              <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Products filters
                </Dialog.Title>
                <span className="absolute left-3 top-3">
                  <ButtonClose onClick={closeModalMoreFilter} />
                </span>
              </div>
              <div className="flex-grow overflow-y-auto">
                <div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                  <div className="py-7">
                    <h3 className="text-xl font-medium">Categories</h3>
                    <div className="mt-6 relative ">{renderMoreFilterItem(DATA_categories)}</div>
                  </div>
                  <div className="py-7">
                    <h3 className="text-xl font-medium">Colors</h3>
                    <div className="mt-6 relative ">{renderMoreFilterItem(DATA_colors)}</div>
                  </div>
                  <div className="py-7">
                    <h3 className="text-xl font-medium">Range Prices</h3>
                    <div className="mt-6 relative ">
                      <div className="relative flex flex-col space-y-8">
                        <div className="space-y-5">
                          <Slider
                            range
                            className="text-red-400"
                            min={PRICE_RANGE[0]}
                            max={PRICE_RANGE[1]}
                            defaultValue={rangePrices}
                            allowCross={false}
                            onChange={(_input: number | number[]) => setRangePrices(_input as number[])}
                          />
                        </div>
                        <div className="flex justify-between space-x-5">
                          <div>
                            <label htmlFor="minPrice" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                              Min price
                            </label>
                            <div className="mt-1 relative rounded-md">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-neutral-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="text"
                                name="minPrice"
                                disabled
                                id="minPrice"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                value={rangePrices[0]}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                              Max price
                            </label>
                            <div className="mt-1 relative rounded-md">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-neutral-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="text"
                                disabled
                                name="maxPrice"
                                id="maxPrice"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                value={rangePrices[1]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-7">
                    <h3 className="text-xl font-medium">Sort Order</h3>
                    <div className="mt-6 relative ">
                      <div className="relative flex flex-col space-y-5">
                        {DATA_sortOrderRadios.map((item) => (
                          <Radio
                            id={item.id}
                            key={item.id}
                            name="radioNameSort"
                            label={item.name}
                            defaultChecked={sortOrderStates === item.id}
                            onChange={setSortOrderStates}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="py-7">
                    <h3 className="text-xl font-medium">On sale!</h3>
                    <div className="mt-6 relative ">
                      <MySwitch
                        label="On sale!"
                        desc="Products currently on sale"
                        enabled={isOnSale}
                        onChange={() => setIsOnSale(!isOnSale)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                <ButtonThird
                  onClick={() => {
                    setRangePrices(PRICE_RANGE);
                    setCategoriesState([]);
                    setColorsState([]);
                    setSortOrderStates("");
                    closeModalMoreFilter();
                  }}
                  sizeClass="px-4 py-2 sm:px-5"
                >
                  Clear
                </ButtonThird>
                <ButtonPrimary
                  onClick={() => {
                    handleApplyFilters();
                    closeModalMoreFilter();
                  }}
                  sizeClass="px-4 py-2 sm:px-5"
                >
                  Apply
                </ButtonPrimary>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  </div>
);

export default TabFiltersMobile;
