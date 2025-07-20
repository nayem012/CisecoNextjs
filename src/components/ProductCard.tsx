"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { CartItemType, Product, ProductStatus } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import ProductStatusIndicator from "./ProductStatus";
import { UrlObject } from "url";
import { useCartStore } from "@/app/stores/cartStore";
import { useQueryClient } from "@tanstack/react-query";
import { cloudinaryLoader } from "@/utils/cloudinaryLoader";

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
  const defaultProduct: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    images: [],
    sku: "",
    sizeInventory: [],
    lowStockThreshold: 0,
    status: "New in",
    metaTitle: "",
    metaDescription: "",
    productTags: [],
    discountedPrice: 0,
  };

  const {
    _id,
    name,
    price = 0,
    discountedPrice,
    description,
    sizeInventory,
    status,
    images = [],
    rating,
  } = data || defaultProduct;

  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addItem, items: cartItems } = useCartStore();
  
  const handleAddToCart = (size: string) => {
    if (!_id || !data) return;

    try {
      addItem({
        productId: _id,
        name,
        price,
        discountedPrice,
        size,
        quantity: 1,
        image: images[0],
        sizeInventory: sizeInventory,
      });
      showAddToCartToast(size);
      queryClient.invalidateQueries({ queryKey: ['cart-products'] });
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const showAddToCartToast = (size: string) => {
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
          {renderProductCartOnNotify(size)}
        </Transition>
      ),
      {
        position: "top-right",
        id: _id || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = (size: string) => {
    const cartItem = cartItems.find(
      item => item.productId === _id && item.size === size
    );

    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {images[0] && (
            <Image
              width={80}
              height={96}
              src={images[0]}
              alt={name}
              className="absolute object-cover object-center"
              loader={cloudinaryLoader}
            />
          )}
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{size}</span>
                </p>
              </div>
              <Prices price={price} discountedPrice={discountedPrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty {cartItem?.quantity || 1}</p>
            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
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

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Quick view</span>
        </ButtonSecondary>
        {renderSizeList()}
      </div>
    );
  };

  const renderSizeList = () => {
    if (!sizeInventory?.length) return null;

    return (
      <div className="absolute right-full inset-x-1 space-y-1.5 rtl:space-y-reverse flex flex-col align-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizeInventory.map((sizeItem, index) => {
          const isOutOfStock = sizeItem.stock <= 0;
          const existingCartItem = cartItems.find(
            item => item.productId === _id && item.size === sizeItem.size
          );
          const maxQuantity = sizeItem.stock - (existingCartItem?.quantity || 0);

          return (
            <div
              key={index}
              className={`nc-shadow-lg w-10 h-10 rounded-xl flex items-center justify-center uppercase font-semibold tracking-tight text-sm ${
                isOutOfStock || maxQuantity <= 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-slate-900 hover:text-white cursor-pointer text-slate-900"
              }`}
              onClick={() => !isOutOfStock && maxQuantity > 0 && handleAddToCart(sizeItem.size)}
            >
              {sizeItem.size}
            </div>
          );
        })}
      </div>
    );
  };

  const prodLink: UrlObject = {
    pathname: `/product-detail/${_id}`,
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link href={prodLink} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={prodLink} className="block">
            {images[0] && (
              <NcImage
                containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                src={images[0]}
                className="object-cover w-full h-full drop-shadow-xl"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                alt="product"
              />
            )}
          </Link>
          <ProductStatusIndicator status={status as ProductStatus} />
          <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {name}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {description?.slice(0, 100)}...
            </p>
          </div>

          <div className="flex justify-between items-end ">
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
        data={data as Product}
      />
    </>
  );
};

export default ProductCard;