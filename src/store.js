import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  
  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      set({ cart: cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) });
    } else {
      set({ cart: [...cart, { ...product, qty: 1 }] });
    }
  },

  // This specific function powers the + and - buttons
  updateQuantity: (id, change) => {
    set({
      cart: get().cart.map(item => {
        if (item.id === id) {
          return { ...item, qty: item.qty + change };
        }
        return item;
      }).filter(item => item.qty > 0) // Removes item if quantity drops to 0
    });
  },

  totalItems: () => get().cart.reduce((total, item) => total + item.qty, 0),
  totalPrice: () => get().cart.reduce((total, item) => total + (item.price * item.qty), 0),
  clearCart: () => set({ cart: [] })
}));