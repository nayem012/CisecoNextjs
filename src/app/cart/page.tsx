'use client';
import { Product } from "@/data/data";

import toast from "react-hot-toast";

import { z } from "zod";
import { useCartStore } from "@/app/stores/cartStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartProductList from "./CartProductList";
import CartOrderSummary from "./CartOrderSummary";
import { useCartForm } from "./CartForm";
import { calculateOrderSummary } from "./cartUtils";
import { createHash } from "crypto";

function hashSHA256(value: string) {
  if (!value) return undefined;
  // Remove spaces, lowercase, and hash
  return window.crypto
    ? window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(value.trim().toLowerCase()))
        .then(buf => Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, "0")).join(""))
    : undefined;
}

const CartPage = () => {
  const [Loading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useCartForm();

  const deliveryArea = watch('deliveryArea');

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
    console.log("Form Data:", formData);
    const { name, email, address, phone, thana, district } = formData;
    const user = {
      name,
      email: email || undefined,
      address: `${address}, ${thana || ""}, ${district || ""}`,
      phone,
      
    };
    try {
      const orderDetails = {
        user: user,
        delivaryCharge: deliveryArea === 'insideDhaka' ? 80 : 120,
        total: calculateOrderSummary(cartItems, products || [], deliveryArea).total,
        cartItems: cartItems,
      };
      setIsLoading(true);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });
      setIsLoading(false);
      if (!response.ok) throw new Error("Order failed");
      // Conversion API call
      const email = user.email ? user.email.trim().toLowerCase() : undefined;
      const phone = user.phone ? user.phone.trim().toLowerCase() : undefined;
      const em = email ? [await hashSHA256(email)] : undefined;
      const ph = phone ? [await hashSHA256(phone)] : undefined;
      await fetch("/api/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "Purchase",
          user_data: {
            ...(em ? { em } : {}),
            ...(ph ? { ph } : {}),
          },
          custom_data: {
            value: orderDetails.total,
            currency: "BDT",
            contents: cartItems.map(item => ({
              id: item.productId,
              quantity: item.quantity,
              item_price: item.price
            })),
          },
          action_source: "website",
        }),
      });
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
    }
  };


  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  )
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        <div className="flex flex-col lg:flex-row first-letter:first-line:space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700">
            <CartProductList
              cartItems={cartItems}
              products={products || []}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
              <CartOrderSummary
                cartItems={cartItems}
                products={products || []}
                deliveryArea={deliveryArea}
                Loading={Loading}
                errors={errors}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                disableCheckout={cartItems.length === 0}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;