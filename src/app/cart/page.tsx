'use client';
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { CartItemType } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
// zod form validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const CartPage = () => {
  // Form validation schema for user name, address, and phone number
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
  });
  // useForm hook for form handling
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  // handle form submission
  const onSubmit = (data: any) => {
    // get cart items, post to server with user details make sure to handle errors
    const cartItems = cart.items.map(item => ({
      productId: item.productId,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
    }));
    const orderDetails = {
      user: data,
      cartItems,
    };
    console.log("Order Details:", orderDetails);
    
  };
  const { 
    cart, 
    removeItem, 
    updateQuantity, 
    clearCart,
    isEmpty
  } = useCart(); 
  // console.log(cart.items, "cart items");
  const renderStatus = (item: CartItemType) => {
    const product = cart.items.find(p => p.productId === item.productId);
    if (!product) {
      return (
        <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-red-500 border border-red-300">
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Item Error</span>
        </div>
      );
    }

    const sizeStock = product.sizeInventory?.find(si => si.size === item.size)?.stock || 0;
    const isOutOfStock = sizeStock < item.quantity;

    return isOutOfStock ? (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Sold Out</span>
      </div>
    ) : (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  const renderProduct = (item: CartItemType, index: number) => {
    return (
      <div
        key={`${item.productId}-${item.size}`}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={item.image}
            alt={item.name}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link href={{pathname: `/product-detail/${item.productId}`}} className="absolute inset-0" />
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between">
              <div className="flex-[1.5]">
                <h3 className="text-base font-semibold">
                  <Link href={{pathname: `/product-detail/${item.productId}`}}>{item.name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  {item.size && (
                    <>
                      <div className="flex items-center space-x-1.5">
                        <span>{item.size}</span>
                      </div>
                      <span className="mx-4 border-l border-slate-200 dark:border-slate-700" />
                    </>
                  )}
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <NcInputNumber
                    defaultValue={item.quantity}
                    onChange={(quantity) => updateQuantity(item.productId, item.size || '', quantity)}
                  />
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={item.price}
                  />
                </div>
              </div>

              <div className="hidden sm:block text-center relative">
                <NcInputNumber
                  defaultValue={item.quantity}
                  onChange={(quantity) => updateQuantity(item.productId, item.size || '', quantity)}
                />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={item.price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {renderStatus(item)}
            <button
              onClick={() => {
                removeItem(item.productId, item.size || '')}}
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const calculateOrderSummary = () => {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 5;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const { subtotal, shipping, tax, total } = calculateOrderSummary();

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Shopping Cart
          </h2>
          {/* <p>
            items: {cart.items.map(item => item.name).join(', ')}
          </p> */}
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href="/">Homepage</Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Shopping Cart</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700">
            {!isEmpty ? (
              cart.items.map(renderProduct)
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500 dark:text-slate-400">Your cart is empty</p>
              </div>
            )}
          </div>

          {cart.items.length > 0 && (
            <>
              <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>

              <div className="flex-1">
                <div className="sticky top-28">
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                  <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                    <div className="flex justify-between pb-4">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        ৳{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span>Shipping estimate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                      ৳{shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span>Tax estimate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                      ৳{tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                      <span>Order total</span>
                      <span> ৳{total.toFixed(2)}</span>
                    </div>
                  </div>
                  {/* form for details with zod and checkout as submit button */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // handle form submission
                      handleSubmit(onSubmit)();
                    }}
                    className="mt-8"
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Name
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Address
                      </label>
                      <input
                        type="text"
                        {...register("address")}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                      {errors.address && (
                        <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        {...register("phone")}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                    <ButtonPrimary type="submit" className="w-full mt-4">
                      Checkout
                    </ButtonPrimary>
                  </form>
                  
                  {/* <ButtonPrimary href="/checkout" className="mt-8 w-full">
                    Checkout
                  </ButtonPrimary> */}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
