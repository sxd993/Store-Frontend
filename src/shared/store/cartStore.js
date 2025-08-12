import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      // Локальное состояние для неавторизованных
      localItems: [],
      
      // UI состояние
      isOptimisticUpdate: false,
      optimisticItems: [],
      
      // Локальные операции (localStorage)
      addToLocal: (product, quantity) => set((state) => {
        const existingIndex = state.localItems.findIndex(item => item.id === product.id);
        if (existingIndex >= 0) {
          state.localItems[existingIndex].quantity += quantity;
        } else {
          state.localItems.push({ ...product, quantity });
        }
      }),
      
      updateLocalQuantity: (productId, quantity) => set((state) => {
        if (quantity === 0) {
          state.localItems = state.localItems.filter(item => item.id !== productId);
        } else {
          const item = state.localItems.find(item => item.id === productId);
          if (item) item.quantity = quantity;
        }
      }),
      
      clearLocal: () => set({ localItems: [] }),
      
      // Optimistic updates для сервера
      setOptimisticItems: (items) => set({
        optimisticItems: items,
        isOptimisticUpdate: true
      }),
      
      clearOptimistic: () => set({
        optimisticItems: [],
        isOptimisticUpdate: false
      }),
    }),
    { name: 'cart-local-storage' }
  )
);