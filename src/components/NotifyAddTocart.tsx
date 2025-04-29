'use client';

import React, { FC } from 'react';
import { Transition } from '@headlessui/react';
import Prices from '@/components/Prices';
import Image from 'next/image';
import Link from 'next/link';
import { CartItemType } from '@/data/data';

interface Props {
  show: boolean;
  item: CartItemType;
  onClose?: () => void;
}

const NotifyAddToCart: FC<Props> = ({ show, item, onClose }) => {
  const displayPrice = item.discountedPrice ?? item.price;

  return (
    <Transition
      show={show}
      enter="transition-all duration-200 ease-out"
      enterFrom="opacity-0 translate-x-4"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-150 ease-in"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-4"
      className="fixed top-6 right-6 z-50"
    >
      <div className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200">
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold">Added to cart!</p>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
        <hr className="border-slate-200 dark:border-slate-700 my-3" />
        <div className="flex">
          <div className="h-24 w-20 relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>
          <div className="ml-4 flex flex-1 flex-col justify-between">
            <div>
              <h3 className="text-base font-medium">{item.name}</h3>
              {item.size && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Size: {item.size}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Qty: {item.quantity}
              </p>
              <Prices price={displayPrice} />
            </div>
            <div className="mt-4 text-right">
              <Link
                href="/cart"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default NotifyAddToCart;
