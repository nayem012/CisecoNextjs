// cartUtils.ts
import { CartItemType, Product } from "@/data/data";

export function calculateOrderSummary(cartItems: CartItemType[], products: Product[], deliveryArea: 'insideDhaka' | 'outsideDhaka') {
  const shipping = deliveryArea === 'insideDhaka' ? 80 : 120;
  const subtotal = cartItems.reduce((sum, item) => {
    const product = products?.find((p) => p._id === item.productId);
    if (product && product.discountedPrice > 0) {
      return sum + (product.discountedPrice * item.quantity);
    }
    return sum + (item.price * item.quantity);
  }, 0);
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}
