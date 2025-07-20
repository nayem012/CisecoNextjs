import React, { Fragment } from "react";
import { Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Slider from "rc-slider";
import { CurrencyDollarIcon, XCircleIcon } from "@heroicons/react/24/outline";
// import XClear from "@/components/TabFilters/XClear";
import { PRICE_RANGE } from "@/contains/FilterConstants";

interface TabFiltersPriceRangeProps {
  rangePrices: number[];
  setRangePrices: (range: number[]) => void;
  handleApplyFilters: () => void;
}

const TabFiltersPriceRange: React.FC<TabFiltersPriceRangeProps> = ({
  rangePrices,
  setRangePrices,
  handleApplyFilters,
}) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none `}
          >
            <CurrencyDollarIcon className="w-4 h-4" />
            <span className="ml-2 min-w-[90px]">{`${rangePrices[0]} ৳- ${rangePrices[1]} ৳`}</span>
            {rangePrices[0] === PRICE_RANGE[0] &&
              rangePrices[1] === PRICE_RANGE[1] ? null : (
              <span onClick={() => setRangePrices(PRICE_RANGE)}>
                <XCircleIcon className="w-4 h-4 ml-3" />
              </span>
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-8">
                  <div className="space-y-5">
                    <span className="font-medium">Price range</span>
                    <Slider
                      range
                      min={PRICE_RANGE[0]}
                      max={PRICE_RANGE[1]}
                      step={1}
                      defaultValue={[rangePrices[0], rangePrices[1]]}
                      allowCross={false}
                      onChange={(_input: number | number[]) =>
                        setRangePrices(_input as number[])
                      }
                    />
                  </div>
                  <div className="flex justify-between space-x-5">
                    <div>
                      <label
                        htmlFor="minPrice"
                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        Min price
                      </label>
                      <div className="mt-1 relative rounded-md">
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                          ৳
                        </span>
                        <input
                          type="text"
                          name="minPrice"
                          disabled
                          id="minPrice"
                          className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={rangePrices[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="maxPrice"
                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        Max price
                      </label>
                      <div className="mt-1 relative rounded-md">
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                          ৳
                        </span>
                        <input
                          type="text"
                          disabled
                          name="maxPrice"
                          id="maxPrice"
                          className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={rangePrices[1]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      setRangePrices(PRICE_RANGE);
                      close();
                    }}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    Clear
                  </ButtonThird>
                  <ButtonPrimary
                    onClick={() => {
                      handleApplyFilters();
                      close();
                    }}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    Apply
                  </ButtonPrimary>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default TabFiltersPriceRange;
