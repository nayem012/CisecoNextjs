import React, { Fragment } from "react";
import { Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Checkbox from "@/shared/Checkbox/Checkbox";
import { ChevronDownIcon, Squares2X2Icon, XCircleIcon } from "@heroicons/react/24/outline";
// import XClear from "@/components/TabFilters/XClear";
import { DATA_categories } from "@/contains/FilterConstants";

interface TabFiltersCategoriesProps {
  categoriesState: string[];
  setCategoriesState: (categories: string[]) => void;
  handleApplyFilters: () => void;
}

const TabFiltersCategories: React.FC<TabFiltersCategoriesProps> = ({
  categoriesState,
  setCategoriesState,
  handleApplyFilters,
}) => {
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
             ${open
                ? "!border-primary-500 "
                : "border-neutral-300 dark:border-neutral-700"
              }
              ${!!categoriesState.length
                ? "!border-primary-500 bg-primary-50 text-primary-900"
                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
              }
              `}
          >
            <Squares2X2Icon className="w-4 h-4" />
            <span className="ml-2">Categories</span>
            {!categoriesState.length ? (
              <ChevronDownIcon className="w-4 h-4 ml-3" />
            ) : (
              <span onClick={() => setCategoriesState([])}>
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
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-5">
                  <Checkbox
                    name="All Categories"
                    label="All Categories"
                    defaultChecked={categoriesState.includes("All Categories")}
                    onChange={(checked) =>
                      handleChangeCategories(checked, "All Categories")
                    }
                  />
                  <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                  {DATA_categories.map((item) => (
                    <div key={item.name} className="">
                      <Checkbox
                        name={item.name}
                        label={item.name}
                        defaultChecked={categoriesState.includes(item.name)}
                        onChange={(checked) =>
                          handleChangeCategories(checked, item.name)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      close();
                      setCategoriesState([]);
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

export default TabFiltersCategories;
