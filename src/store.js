import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(i => i.id === product.id);
        if (existing) {
          return { cart: state.cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
        }
        return { cart: [...state.cart, { ...product, qty: 1 }] };
      }),
      updateQty: (id, delta) => set((state) => ({
        cart: state.cart.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
      })),
      clearCart: () => set({ cart: [] }),
      totalItems: () => get().cart.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () => get().cart.reduce((sum, i) => sum + i.qty * i.price, 0),
    }),
    { name: 'tutus-cart' }
  )
);