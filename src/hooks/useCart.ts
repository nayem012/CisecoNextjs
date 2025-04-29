// import { ISizeInventory } from './../../../artexo-admin/src/lib/db/models/Products';
'use client';

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from './useLocalStorage';
import { Product, CartItemType, ISizeInventory } from '@/data/data';

// interface CartItem {
//   productId: string;
//   size: string;
//   quantity: number;
//   addedAt: number;
//   priceSnapshot: number;
// }
export const useCart = () => {
    const queryClient = useQueryClient();

    const [cartItems, setCartItems, isReady] = useLocalStorage<CartItemType[]>('artexo-cart', []);
    // console.log(cartItems, "cart items");

    // Extract unique product IDs
    const productIds = useMemo(() => {
        return isReady ? Array.from(new Set(cartItems.map(item => item.productId))) : [];
    }, [cartItems, isReady]);
    //   console.log(productIds, "product ids");
    // Fetch live product data
    const { data, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['cart-products', productIds],
        queryFn: async () => {
            // console.log(productIds, "product ids from query");
            const response = await fetch(`/api/products?ids=${productIds.join(',')}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            // console.log(data, "data from query");
            if (!Array.isArray(data)) {
                throw new Error('Expected data to be an array');
            }
            setCartItems(prev => {
                const updated = prev.map(item => {
                    const product = data.find((p: Product) => p._id === item.productId);
                    const priceSnapshot = () => {
                        if (product.discountedPrice && product.discountedPrice > 0) {
                            return product.discountedPrice;
                        } else {
                            return product.price;
                        }
                    }
                    if (product) {
                        const sizeInventory = product.sizeInventory.find((si: ISizeInventory) => si.size === item.size);
                        return {
                            ...item,
                            priceSnapshot: priceSnapshot(),
                            isValid: (sizeInventory?.stock ?? 0) >= item.quantity,
                        };
                    }
                    return item;
                });
                return updated;
            }
            );
            // console.log(data, " dataaaaaa response");
            return data;
        },
        enabled: productIds.length > 0,
        staleTime: 60 * 1000, // 1 min caching
    });

    // Map of productId to product
    const productMap = useMemo(
        () => new Map(data?.map(p => [p._id, p])),
        [data]
    );
    // console.log(data, "product data");
    // Build display cart
    const cart = useMemo(() => {
        const items: CartItemType[] = [];
        let total = 0;
        let count = 0;

        cartItems.forEach(cartItem => {
            const product = productMap.get(cartItem.productId);
            if (!product) return;

            const sizeInventory = product.sizeInventory.find(si => si.size === cartItem.size);
            const currentPrice = product.discountedPrice ?? product.price;
            const isValid = (sizeInventory?.stock ?? 0) >= cartItem.quantity;

            items.push({
                productId: `${product._id}`,
                name: product.name,
                image: product.images?.[0],
                // price: currentPrice,
                size: cartItem.size,
                price: product.price,
                discountedPrice: product.discountedPrice,
                isValid,
                quantity: cartItem.quantity,
                sizeInventory: product.sizeInventory,
            });

            total += currentPrice * cartItem.quantity;
            count += cartItem.quantity;
        });

        return { items, total, count };
    }, [cartItems, productMap]);

    // Internal method to update cart
    const updateCart = useCallback(
        (updater: (prev: CartItemType[]) => CartItemType[]) => {
            setCartItems(prev => {
                const updated = updater(prev);
                return updated;
            });
        },
        [setCartItems]
    );

    // Public API
    const addItem = useCallback(
        (product: Product, size: string, quantity: number) => {
            // updateCart(prev => {
            //     const index = prev.findIndex(item => item.productId === product._id && item.size === size);
            //     const priceSnapshot = () => {
            //         if ((product.discountedPrice ?? 0) > 0) {
            //             return product.discountedPrice;
            //         } else {
            //             return product.price;
            //         }
            //     }
            //     if (index !== -1) {
            //         const updated = [...prev];
            //         updated[index].quantity += quantity;
            //         return updated;
            //     }

            //     return [
            //         ...prev,
            //         {
            //             productId: product._id,
            //             name: product.name,
            //             image: product.images?.[0],
            //             price: priceSnapshot() ?? 0,
            //             size,
            //             originalPrice: product.price,
            //             isValid: true, // Default validity, can be updated later
            //             quantity,
            //             addedAt: Date.now(),
            //             sizeInventory: product.sizeInventory,
            //         },
            //     ];
            // });
        },
        [updateCart]
    );

    const removeItem = useCallback(
        (productId: string, size: string) => {
            updateCart(prev => prev.filter(item => !(item.productId === productId && item.size === size)));
        },
        [updateCart]
    );

    const updateQuantity = useCallback(
        (productId: string, size: string, quantity: number) => {
            updateCart(prev =>
                prev.map(item =>
                    item.productId === productId && item.size === size ? { ...item, quantity } : item
                )
            );
        },
        [updateCart]
    );

    const clearCart = useCallback(() => updateCart(() => []), [updateCart]);
    const refreshCart = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['cart-products'] });
    }
        , [queryClient]);
    return {
        cart,
        cartItems,
        isLoading,
        isError,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isEmpty: cartItems.length === 0,
    };
};
