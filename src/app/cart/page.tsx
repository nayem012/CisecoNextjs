'use client';
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { CartItemType, Product } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCartStore } from "@/app/stores/cartStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
});

const CartPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // Fetch all products first
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['cart-products'],
    queryFn: async (): Promise<Product[]> => {
      const ids = useCartStore.getState().items.map(item => item.productId).join(',');
      if (!ids) return [];
      const response = await fetch(`/api/products?ids=${ids}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const rawProducts = await response.json();
      return rawProducts.map((product: Product) => ({
        ...product,
        priceSnapshot: product.discountedPrice && product.discountedPrice > 0
          ? product.discountedPrice
          : product.price,
        isValid: true,
        image: product.images[0] || "",

      }));
    }
  });

  // Use Zustand store with product data
  const { 
    items: cartItems,
    removeItem,
    updateQuantity,
    clearCart,
    validateCart
  } = useCartStore();

  // Validate cart whenever products change
  React.useEffect(() => {
    if (products) {
      validateCart(products);
    }
  }, [products, validateCart]);

  const onSubmit = async (formData: any) => {
    try {
      const orderDetails = {
        user: formData,
        cartItems: cartItems.map(item => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          price: item.priceSnapshot,
          name: item.name,
        }))
      };

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) throw new Error("Order failed");
      
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
    }
  };

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

  const renderProduct = (item: CartItemType & { price: number; discountedPrice: number; sizeInventory: Array<{ size: string; stock: number }> }) => {
      const product = products?.find((p: { _id: string }) => p._id === item.productId);
    
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
                <Prices price={item.priceSnapshot??0 * item.quantity} discountedPrice={item.priceSnapshot}/>
              </div>
            </div>

            <div className="hidden sm:block text-center relative">
              <NcInputNumber
                defaultValue={item.quantity}
                onChange={(quantity) => updateQuantity(item.productId, item.size||"", quantity)}
              />
            </div>

            <div className="hidden flex-1 sm:flex justify-end">
              <Prices price={item.priceSnapshot??0 * item.quantity} />
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
  };

  const calculateOrderSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => 
      sum + (item.priceSnapshot * item.quantity), 0
    );
    const shipping = 80;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const { subtotal, shipping, tax, total } = calculateOrderSummary();
  const disableCheckout = cartItems.length === 0 || 
    cartItems.some(item => !item.isValid) ||
    Object.keys(errors).length > 0;

  if (isLoading) return (
    // Loading with skeleton or spinner
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  )
  if (isError) return <div>Error loading products</div>;
  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        {/* ... rest of the JSX remains similar to previous version ... */}
        <div className="flex flex-col lg:flex-row first-letter:first-line:space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const product = products?.find((p) => p._id === item.productId);
                if (!product) return null;
                return renderProduct({
                  ...item,
                  price: product.price,
                  discountedPrice: product.discountedPrice ??0,
                  sizeInventory: product.sizeInventory,
                  image: product.images[0] || "",
                  name: product.name,
                });
              })
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500 dark:text-slate-400">Your cart is empty</p>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
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
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
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
                      Place order
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