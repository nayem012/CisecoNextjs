import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  discountedPrice?: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price,
  discountedPrice,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  // console.log("discountedPriceeeeeeeeeeee", discountedPrice);
  return (
    <div className={`${className}`}>
      {/* <div
        className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        <span className="text-green-500 !leading-none">৳{String(price)}</span>
      </div> */}
      {
        discountedPrice ? (
          <div className={`flex items-center `}>
            <span className="text-gray-500 line-through !leading-none">
              ৳{String(price)}
            </span>
            <span className={`text-green-500 !leading-none border-2 border-green-500 rounded-lg ml-2 ${contentClass}`}>
              ৳{String(discountedPrice)}
            </span>
          </div>
        ) : (
          <div className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`} >
            <span className="text-green-500 !leading-none">
              ৳{String(price)}
            </span>
          </div>
        )
      }
    </div>
  );
};

export default Prices;
