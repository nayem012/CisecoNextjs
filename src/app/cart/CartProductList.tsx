import React from "react";
import { CartItemType, Product } from "@/data/data";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import Link from "next/link";
import Image from "next/image";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/app/stores/cartStore";

interface CartProductListProps {
  cartItems: CartItemType[];
  products: Product[];
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
}

const CartProductList: React.FC<CartProductListProps> = ({ cartItems, products, updateQuantity, removeItem }) => {
  const renderStatus = (item: CartItemType) => {
    if (!item.isValid) {
      return (
        <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-red-500 border border-red-300">
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Out of Stock</span>
        </div>
      );
    }
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          const product = products?.find((p) => p._id === item.productId);
          if (!product) return null;
          return (
            <div key={`${item.productId}-${item.size}`} className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0">
              <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  fill
                  src={item.image || ""}
                  alt={item.name}
                  sizes="300px"
                  className="h-full w-full object-contain object-center"
                />
                <Link href={`/product-detail/${item.productId}`} className="absolute inset-0" />
              </div>
              <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex-[1.5]">
                    <h3 className="text-base font-semibold">
                      <Link href={`/product-detail/${item.productId}`}>{item.name}</Link>
                    </h3>
                    <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                      {item.size && (
                        <div className="flex items-center space-x-1.5">
                          <span>{item.size}</span>
                          {product && (
                            <span className="text-slate-500">
                              (Stock: {product.sizeInventory.find(si => si.size === item.size)?.stock || 0})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex justify-between w-full sm:hidden relative">
                      <NcInputNumber
                        defaultValue={item.quantity}
                        onChange={(quantity) => updateQuantity(item.productId, item.size || "", quantity)}
                      />
                      <Prices price={item.price??0 * item.quantity} discountedPrice={item.discountedPrice*item.quantity}/>
                    </div>
                  </div>
                  <div className="hidden sm:block text-center relative">
                    <NcInputNumber
                      defaultValue={item.quantity}
                      onChange={(quantity) => updateQuantity(item.productId, item.size||"", quantity)}
                    />
                  </div>
                  <div className="hidden flex-1 sm:flex justify-end">
                    <Prices price={item.price ?? 0 * item.quantity} discountedPrice={item.discountedPrice ?? 0 * item.quantity} />
                  </div>
                </div>
                <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                  {renderStatus(item)}
                  <button
                    onClick={() => removeItem(item.productId, item.size || "")}
                    className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm"
                  >
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-10">
          <p className="text-slate-500 dark:text-slate-400">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default CartProductList;
