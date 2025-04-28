import { Product } from '@/data/data'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItemType } from '@/data/data'

type CartState = {
  items: CartItemType[]
  addItem: (item: Omit<CartItemType, 'addedAt' | 'isValid'>) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  validateCart: (productData: Product[]) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => 
          i.productId === item.productId && i.size === item.size
        )
        
        return {
          items: existing
            ? state.items.map(i => i === existing 
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
              )
            : [...state.items, { ...item, addedAt: Date.now(), isValid: true }]
        }
      }),

      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter(i => 
          !(i.productId === productId && i.size === size)
        )
      })),

      updateQuantity: (productId, size, quantity) => set((state) => ({
        items: state.items.map(i => 
          i.productId === productId && i.size === size
            ? { ...i, quantity }
            : i
        )
      })),

      validateCart: (productData) => set((state) => {
        const validatedItems = state.items.map(item => {
          const product = productData.find(p => p._id === item.productId)
          if (!product) return { ...item, isValid: false }
          
          const sizeInventory = product.sizeInventory.find(si => 
            si.size === item.size
          )
          const isValid = (sizeInventory?.stock ?? 0) >= item.quantity
          
          return { ...item, isValid }
        })
        
        return { items: validatedItems }
      }),

      clearCart: () => set({ items: [] }),

      getCart: () => get().items,
    }),
    {
      name: 'artexo-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)