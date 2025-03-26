"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, ProductStatus } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatusIndicator from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import toast from "react-hot-toast";
import { UrlObject } from "url";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data,
  isLiked,
}) => {
  const {
    _id,
    name,
    price,
    discountedPrice,
    description,
    category,
    images,
    sizeInventory,
    status,
    rating,
  } = data || {};
  
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>();
  const router = useRouter();

  const notifyAddTocart = ({ size }: { size?: string }) => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }

    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      {
        position: "top-right",
        id: _id || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    if (!data) return null;

    return (
      <div className="flex">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 relative">
          {images?.[0] && (
            <Image
              fill
              src={images[0]}
              alt={name || "Product image"}
              className="object-cover object-center"
              sizes="100px"
            />
          )}
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="text-base font-medium">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{category}</span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4" />
                  <span>{size || "Size Not Selected"}</span>
                </p>
              </div>
              <Prices price={price} discountedPrice={discountedPrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>
            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSizeList = () => {
    if (!sizeInventory?.length) return null;

    return (
      <div className="absolute bottom-3 inset-x-3 grid grid-cols-4 gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        {sizeInventory.map(({ size, stock }) => (
          <button
            key={size}
            type="button"
            disabled={stock <= 0}
            className={`w-full h-10 rounded-xl flex items-center justify-center uppercase font-semibold text-sm transition-colors
              ${selectedSize === size 
                ? "bg-primary-6000 text-white border-2 border-primary-6000" 
                : "bg-white hover:bg-gray-100 text-slate-900 border-2 border-slate-200"}
              ${stock <= 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedSize(size);
            }}
            title={stock <= 0 ? "Out of stock" : `Select size ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
    );
  };

  if (!data) return null;

  const renderGroupButtons = () => (
    <div className="absolute top-3 start-3 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
      <ButtonSecondary
        className="!p-2.5 bg-white hover:bg-slate-100"
        onClick={() => {
          setShowModalQuickView(true);
        }}
      >
        <ArrowsPointingOutIcon className="w-5 h-5" />
      </ButtonSecondary>
      <ButtonPrimary
        className="!p-2.5"
        onClick={() => {
          notifyAddTocart({ size: selectedSize });
        }}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h2v6h9l-2 8h10l-3-9h-10.5l-.5-2h-10zm16 14h-10l1.5-6h10l-1.5 6z"/>
        </svg>
      </ButtonPrimary>
    </div>
  );

  const prodUrl: UrlObject = {
    pathname: `/product-detail/${_id}`,
  };

  return (
    <>
      <div className={`nc-ProductCard relative flex flex-col bg-transparent group ${className}`}>
        <Link href={prodUrl} className="absolute inset-0 z-0" />

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 h-80">
          <NcImage
            containerClassName="w-full h-full"
            src={images?.[0] || "/images/placeholder.png"}
            className="object-cover w-full h-full drop-shadow-xl"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
            alt={name}
          />
          
          <ProductStatusIndicator status={status || "New in"} />
          <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
          {renderGroupButtons()}
          {renderSizeList()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex justify-between items-end">
            <Prices price={price} discountedPrice={discountedPrice} />
            {rating && (
              <div className="flex items-center mb-0.5">
                <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
                <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                  {rating.average.toFixed(1)} ({rating.count} reviews)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        data={data}
      />
    </>
  );
};

export default ProductCard;