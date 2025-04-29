"use client";

import { Popover, Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import { Fragment } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon as TrashSolid } from '@heroicons/react/20/solid';
import { useCartStore } from "@/app/stores/cartStore";
import { CartItemType } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
const getProductsByIds = async (ids: string[]) => {
  // Fetch product data from your API with react-query
  const response = await fetch(`/api/products?ids=${ids.join(',')}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Expected data to be an array');
  }
  return data.map((item: any) => ({
    ...item,
    priceSnapshot: item.discountedPrice && item.discountedPrice > 0
      ? item.discountedPrice
      : item.price,
  }));
}
export default function CartDropdown() {
  const { 
    items: cartItems,
    removeItem,
    validateCart,
    clearCart,
  } = useCartStore();
  
  const productIds = Array.from(new Set(cartItems.map(item => item.productId)));
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['cart-products', productIds],
    queryFn: async () => {
      const fetchedProducts = await getProductsByIds(productIds);
      validateCart(fetchedProducts);
      return fetchedProducts;
    },
    enabled: productIds.length > 0,
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
    // if item.discountedPrice is greater than 0, use it, otherwise use item.price
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products?.find(p => p._id === item.productId);
    if (!product) return sum;
    const priceSnapshot = product.discountedPrice && product.discountedPrice > 0
      ? product.discountedPrice
      : product.price;
    return sum + (priceSnapshot * item.quantity);
  }
  , 0);

    

  const renderProduct = (item: CartItemType) => (
    <div key={`${item.productId}-${item.size}`} className="flex py-5 last:pb-0">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {item.image && (
          <Image
            fill
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain object-center"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        )}
        <Link
          className="absolute inset-0"
          href={{pathname: `/products/${item.productId}`}}
          prefetch={false}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium">
              <Link 
                href={{pathname:`/products/${item.productId}`}}
                className="hover:text-primary-6000"
              >
                {item.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Size: {item.size} • Qty: {item.quantity}
            </p>
            {!item.isValid && (
              <p className="text-red-500 text-sm mt-1">Out of stock</p>
            )}
          </div>
          <Prices price={item.price * item.quantity} className="mt-0.5" discountedPrice={item.discountedPrice * item.quantity} />
        </div>
        <div className="flex-1 flex items-end justify-between">
          <button
            onClick={() => removeItem(item.productId, item.size)}
            className="flex items-center text-primary-6000 hover:text-red-500"
          >
            <TrashSolid className="w-5 h-5 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`${open ? "ring-2 ring-primary-500" : ""} 
              group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 rounded-full 
              inline-flex items-center justify-center relative transition-all`}
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 
              absolute top-1.5 right-1.5 rounded-full text-[10px] text-white">
              {totalItems}
            </div>
            <ShoppingCartIcon className="w-6 h-6 text-slate-600" />
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
            <Popover.Panel className="absolute z-50 right-0 mt-3.5 w-screen max-w-xs sm:max-w-md">
              <div className="rounded-2xl shadow-lg bg-white ring-1 ring-black/5">
                <div className="p-5 max-h-[60vh] overflow-y-auto">
                  <h3 className="text-xl font-semibold">Shopping Cart</h3>
                  
                  {isLoading ? (
                    <div className="py-5 text-center">Loading cart...</div>
                  ) : cartItems.length === 0 ? (
                    <div className="py-5 text-center">Your cart is empty</div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {cartItems.map(renderProduct)}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="bg-neutral-50 p-5">
                    <div className="flex justify-between font-semibold">
                      <span>Subtotal</span>
                      <span>৳{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="mt-5 flex gap-2">
                      <ButtonSecondary
                        href="/cart"
                        className="flex-1"
                        onClick={close}
                      >
                        View Cart
                      </ButtonSecondary>
                    </div>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}