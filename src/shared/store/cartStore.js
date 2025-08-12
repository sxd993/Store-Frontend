import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

// Опциональный Zustand store для глобального состояния корзины
// Можно использовать для уведомлений, быстрого доступа к количеству товаров в хедере и т.д.

export const useCartStore = create(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Состояние
        notifications: [],
        lastAddedItem: null,
        cartDrawerOpen: false,
        checkoutStep: 'cart', // 'cart' | 'shipping' | 'payment' | 'confirmation'

        // Уведомления
        addNotification: (notification) => {
          const id = Date.now() + Math.random();
          set((state) => ({
            notifications: [
              ...state.notifications,
              { id, timestamp: Date.now(), ...notification }
            ]
          }));
          
          // Автоматическое удаление через 5 секунд
          setTimeout(() => {
            get().removeNotification(id);
          }, 5000);
        },

        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }));
        },

        clearNotifications: () => {
          set({ notifications: [] });
        },

        // Последний добавленный товар (для анимаций/уведомлений)
        setLastAddedItem: (item) => {
          set({ lastAddedItem: item });
          
          // Очищаем через 3 секунды
          setTimeout(() => {
            set({ lastAddedItem: null });
          }, 3000);
        },

        // Боковая корзина (drawer)
        openCartDrawer: () => set({ cartDrawerOpen: true }),
        closeCartDrawer: () => set({ cartDrawerOpen: false }),
        toggleCartDrawer: () => set((state) => ({ 
          cartDrawerOpen: !state.cartDrawerOpen 
        })),

        // Шаги оформления заказа
        setCheckoutStep: (step) => set({ checkoutStep: step }),
        nextCheckoutStep: () => {
          const steps = ['cart', 'shipping', 'payment', 'confirmation'];
          const current = get().checkoutStep;
          const currentIndex = steps.indexOf(current);
          if (currentIndex < steps.length - 1) {
            set({ checkoutStep: steps[currentIndex + 1] });
          }
        },
        prevCheckoutStep: () => {
          const steps = ['cart', 'shipping', 'payment', 'confirmation'];
          const current = get().checkoutStep;
          const currentIndex = steps.indexOf(current);
          if (currentIndex > 0) {
            set({ checkoutStep: steps[currentIndex - 1] });
          }
        },

        // Сброс всего состояния
        resetState: () => {
          set({
            notifications: [],
            lastAddedItem: null,
            cartDrawerOpen: false,
            checkoutStep: 'cart'
          });
        }
      }),
      {
        name: 'nnv-cart-store',
        partialize: (state) => ({
          // Сохраняем только некоторые части состояния
          checkoutStep: state.checkoutStep
        })
      }
    )
  )
);

// Селекторы для удобства
export const useCartNotifications = () => useCartStore(state => state.notifications);
export const useCartDrawer = () => useCartStore(state => ({
  isOpen: state.cartDrawerOpen,
  open: state.openCartDrawer,
  close: state.closeCartDrawer,
  toggle: state.toggleCartDrawer
}));
export const useCheckoutStep = () => useCartStore(state => ({
  step: state.checkoutStep,
  setStep: state.setCheckoutStep,
  nextStep: state.nextCheckoutStep,
  prevStep: state.prevCheckoutStep
}));