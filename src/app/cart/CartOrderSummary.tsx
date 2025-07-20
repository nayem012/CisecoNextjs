import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { calculateOrderSummary } from "./cartUtils";

interface CartOrderSummaryProps {
  cartItems: any[];
  products: any[];
  deliveryArea: 'insideDhaka' | 'outsideDhaka';
  Loading: boolean;
  errors: any;
  register: any;
  handleSubmit: any;
  onSubmit: any;
  disableCheckout: boolean;
}

const CartOrderSummary: React.FC<CartOrderSummaryProps> = ({
  cartItems,
  products,
  deliveryArea,
  Loading,
  errors,
  register,
  handleSubmit,
  onSubmit,
  disableCheckout,
}) => {
  const { subtotal, shipping, total } = calculateOrderSummary(cartItems, products, deliveryArea);

  // Helper to show/hide thana/district fields
  const showOutsideDhaka = deliveryArea === 'outsideDhaka';

  return (
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
          <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
            <span>Order total</span>
            <span> ৳{total.toFixed(2)}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {/* name */}
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
          {/* delivery area */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Delivery Area
            </label>
            <select
              {...register("deliveryArea")}
              className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="insideDhaka">Inside Dhaka (Delivery: ৳80)</option>
              <option value="outsideDhaka">Outside Dhaka (Delivery: ৳120)</option>
            </select>
          </div>
          {/* address */}
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
          {/* thana/district only if outsideDhaka */}
          {showOutsideDhaka && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Thana
                </label>
                <input
                  type="text"
                  {...register("thana")}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.thana && (
                  <p className="mt-2 text-sm text-red-600">{errors.thana.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  District
                </label>
                <input
                  type="text"
                  {...register("district")}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.district && (
                  <p className="mt-2 text-sm text-red-600">{errors.district.message}</p>
                )}
              </div>
            </>
          )}
          {/* email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email (optional)
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
          {/* phone */}
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
          <ButtonPrimary 
            type="submit" 
            className={`w-full mt-4 ${disableCheckout ? "bg-red-400" : "bg-primary-600 hover:bg-primary-500"}`}
            disabled={disableCheckout}
          >
            {Loading ? "Placing Order..." : "Place Order"}
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default CartOrderSummary;
