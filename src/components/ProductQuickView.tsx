"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { CartItemType, Product, ProductStatus } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import NotifyAddTocart from "./NotifyAddTocart";
import AccordionInfo from "@/components/AccordionInfo";
import Image from "next/image";
import Link from "next/link";
import { UrlObject } from "url";
import {cloudinaryLoader} from "@/utils/cloudinaryLoader";
// import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/app/stores/cartStore";
export interface ProductQuickViewProps {
  className?: string;
  product: Product;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({ className = "", product }) => {
  const {
    _id,
    name,
    price,
    discountedPrice,
    description,
    images = [],
    sizeInventory = [],
    status,
    rating,
    category,
    metaDescription,
  } = product || {};

  const [sizeSelected, setSizeSelected] = useState(sizeInventory[0]?.size || "");
  const [quantitySelected, setQuantitySelected] = useState(1);
  const { addItem } = useCartStore();
  const notifyAddTocart = () => {
    if (!product) return;
    // convert to CartItemType
    const cartItem: CartItemType = {
      ...product,
      productId: _id,
      image: images[0] || "/images/placeholder.png",
      size: sizeSelected,
      quantity: quantitySelected,
    };
    addItem(cartItem);
    toast.custom(
      (t) => (

        <NotifyAddTocart
          item={cartItem}
          show={t.visible}
          onClose={() => toast.dismiss(t.id)}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderSizeList = () => {
    if (!sizeInventory.length) return null;

    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="size-select">
            <span>
              Size:
              <span className="ms-1 font-semibold">{sizeSelected}</span>
            </span>
          </label>
          <Link
            href="#size-chart"
            className="text-primary-6000 hover:text-primary-500"
          >
            See sizing chart
          </Link>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-2.5">
          {sizeInventory.map(({ size, stock }) => {
            const isActive = size === sizeSelected;
            const isOutOfStock = stock <= 0;

            return (
              <button
                key={size}
                type="button"
                disabled={isOutOfStock}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                  text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0
                  ${isOutOfStock
                    ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
                    : "cursor-pointer"
                  }
                  ${isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  }`}
                onClick={() => setSizeSelected(size)}
                title={isOutOfStock ? "Out of stock" : `Stock: ${stock}`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) return null;

    const statusConfig = {
      "New in": { icon: SparklesIcon, text: "New Arrival" },
      "Limited Edition": { icon: ClockIcon, text: "Limited Edition" },
      "Sold Out": { icon: NoSymbolIcon, text: "Sold Out" },
      "Offer": { icon: IconDiscount, text: "Special Offer" },
      "Pre-Order": { icon: ClockIcon, text: "Pre-Order" },
    };

    const { icon: Icon, text } = statusConfig[status] || {};
    if (!Icon) return null;

    return (
      <div className="absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300">
        <Icon className="w-3.5 h-3.5" />
        <span className="ms-1 leading-none">{text}</span>
      </div>
    );
  };

  const renderSectionContent = () => {
    if (!product) return null;
    const prodUrl: UrlObject = {
      pathname: `/product-detail/${_id}`,
    };
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            <Link href={prodUrl}>{name}</Link>
          </h2>

          <div className="flex justify-start items-center mt-5 space-x-4 sm:space-x-5">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={price}
              discountedPrice={discountedPrice}
            />

            <div className="h-6 border-s border-slate-300 dark:border-slate-700" />

            <div className="flex items-center">
              <div className="flex items-center text-sm font-medium">
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ms-1.5 flex">
                  <span>{rating?.average?.toFixed(1) || "0.0"}</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    {rating?.count || 0} reviews
                  </span>
                </div>
              </div>
              <span className="hidden sm:block mx-2.5">·</span>
              <span className="hidden sm:flex items-center text-sm">
                {category}
              </span>
            </div>
          </div>
        </div>

        {renderSizeList()}

        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={quantitySelected}
              onChange={setQuantitySelected}
              min={1}
              max={sizeInventory.find(s => s.size === sizeSelected)?.stock || 1}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
            disabled={!sizeInventory.find(s => s.size === sizeSelected)?.stock}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ms-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        <AccordionInfo
          data={[
            {
              name: "Description",
              content: description || metaDescription || "",
            },
            {
              name: "Features",
              content: `
                <ul class="list-disc list-inside leading-7">
                  ${metaDescription ? `<li>${metaDescription}</li>` : ''}
                  <li>Category: ${category}</li>
                  ${sizeInventory.map(s => `
                    <li>Size ${s.size}: ${s.stock} in stock</li>
                  `).join('')}
                </ul>`,
            },
          ]}
        />
      </div>
    );
  };

  if (!product) return null;

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      <div className="lg:flex">
        <div className="w-full lg:w-[50%] ">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
              <Image
                src={images[0] || "/images/placeholder.png"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full rounded-xl object-cover"
                alt={name}
                priority
                loader={cloudinaryLoader}
              />
            </div>
            {renderStatus()}
            <LikeButton className="absolute end-3 top-3" />
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6">
            {images.slice(1, 3).map((image, index) => (
              <div key={index} className="aspect-w-3 aspect-h-4">
                <Image
                  fill
                  src={image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full rounded-xl object-cover"
                  alt={`${name} - ${index + 2}`}
                  loader={cloudinaryLoader}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:ps-7 xl:ps-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;