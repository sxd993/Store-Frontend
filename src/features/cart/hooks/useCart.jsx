import { useMemo, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useCartStorage } from './useCartStorage';
import { useCartApi } from './useCartApi';
import { useCartActions } from './useCartActions';
import { getCartCalculations } from '../utils/cartCalculations';
import { formatCartItems, mergeCartData } from '../utils/cartHelpers';

/**
 * Главный хук для работы с корзиной
 * Объединяет все функциональности: localStorage, API, расчеты
 */
export const useCart = () => {
  const { isAuthenticated, user } = useAuth();
  const storageCart = useCartStorage();
  const apiCart = useCartApi();
  const actions = useCartActions();

  // Объединенная корзина (localStorage + сервер для авторизованных)
  const cartItems = useMemo(() => {
    if (!isAuthenticated) {
      return storageCart.cartItems;
    }

    // Для авторизованных пользователей объединяем данные
    return mergeCartData(storageCart.cartItems, apiCart.serverCart);
  }, [isAuthenticated, storageCart.cartItems, apiCart.serverCart]);

  // Отформатированные товары для отображения
  const formattedCartItems = useMemo(() => {
    return formatCartItems(cartItems);
  }, [cartItems]);

  // Расчеты корзины
  const calculations = useMemo(() => {
    return getCartCalculations(cartItems);
  }, [cartItems]);

  // Общее состояние загрузки
  const isLoading = storageCart.isLoading || 
                   apiCart.isLoadingCart || 
                   actions.isLoading;

  // Проверка наличия товара в корзине
  const isItemInCart = (productId) => {
    return cartItems.some(item => item.id === Number(productId));
  };

  // Получение количества конкретного товара
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === Number(productId));
    return item ? item.quantity : 0;
  };

  // Проверка пустоты корзины
  const isEmpty = cartItems.length === 0;

  // Автоматическая синхронизация при авторизации
  useEffect(() => {
    if (isAuthenticated && user && storageCart.cartItems.length > 0) {
      // Небольшая задержка чтобы дать загрузиться серверной корзине
      const timer = setTimeout(() => {
        actions.syncCartOnAuth().then((result) => {
          if (result.success && result.message) {
            console.log(result.message);
          }
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, storageCart.cartItems.length, actions]);

  // Очистка localStorage при разлогине
  useEffect(() => {
    if (!isAuthenticated) {
      // При разлогине можно оставить корзину в localStorage
      // или очистить - зависит от бизнес-логики
      // Пока оставляем корзину
    }
  }, [isAuthenticated]);

  return {
    // Данные корзины
    cartItems,
    formattedCartItems,
    isEmpty,
    itemsCount: calculations.totalItems,

    // Расчеты
    calculations: {
      subtotal: calculations.subtotal,
      shipping: calculations.shipping,
      discount: calculations.discount,
      total: calculations.total,
      totalItems: calculations.totalItems,
      hasDiscount: calculations.hasDiscount,
      hasFreeShipping: calculations.hasFreeShipping
    },

    // Проверки
    isItemInCart,
    getItemQuantity,

    // Действия
    addToCart: actions.addToCart,
    updateQuantity: actions.updateQuantity,
    removeFromCart: actions.removeFromCart,
    clearCart: actions.clearCart,
    incrementItem: actions.incrementItem,
    decrementItem: actions.decrementItem,

    // Состояния
    isLoading,
    isAdding: actions.isAdding,
    isUpdating: actions.isUpdating,
    isRemoving: actions.isRemoving,
    isClearing: actions.isClearing,

    // Ошибки
    error: apiCart.cartError || apiCart.addError || apiCart.updateError || 
           apiCart.removeError || apiCart.clearError,

    // Дополнительные данные для авторизованных
    serverCart: apiCart.serverCart,
    cartItemsInfo: apiCart.cartItemsInfo,

    // Рефеч данных
    refetch: apiCart.refetchCart
  };
};