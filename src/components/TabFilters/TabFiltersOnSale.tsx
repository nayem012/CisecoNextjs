import React from "react";
import { TagIcon, XCircleIcon } from "@heroicons/react/24/outline";
// import XClear from "@/components/TabFilters/XClear";

interface TabFiltersOnSaleProps {
    isOnSale: boolean;
    setIsOnSale: (onSale: boolean) => void;
    handleApplyFilters: () => void;
}

const TabFiltersOnSale: React.FC<TabFiltersOnSaleProps> = ({ isOnSale, setIsOnSale, handleApplyFilters }) => {
    const handleChangeOnSale = () => {
        setIsOnSale(!isOnSale);
        handleApplyFilters();
    }
    return (
        <div
            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none ${!isOnSale
                ? "border-primary-500 bg-primary-50 text-primary-900"
                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }`}
            onClick={handleChangeOnSale}
        >
            <TagIcon className="w-4 h-4" />
            <span className="line-clamp-1 ml-2">On sale</span>
            {!isOnSale && <XCircleIcon className="w-4 h-4 ml-3"/>}
        </div>
    );
};

export default TabFiltersOnSale;
