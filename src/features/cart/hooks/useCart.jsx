import { useMemo } from 'react';
import { useCartApi } from './useCartApi';
import { getCartCalculations } from '../utils/cartCalculations';
import { formatCartItems } from '../utils/cartHelpers';

export const useCart = () => {
  const {
    items,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    syncCart,
    isAdding,
    isUpdating,
    isSyncing
  } = useCartApi();

  // Мемоизированные вычисления
  const formattedCartItems = useMemo(() => formatCartItems(items), [items]);
  const calculations = useMemo(() => getCartCalculations(items), [items]);

  // Вспомогательные функции
  const incrementItem = (productId) => {
    const currentQuantity = getItemQuantity(productId);
    updateQuantity({ productId, quantity: currentQuantity + 1 });
  };

  const decrementItem = (productId) => {
    const currentQuantity = getItemQuantity(productId);
    const newQuantity = currentQuantity <= 1 ? 0 : currentQuantity - 1;
    updateQuantity({ productId, quantity: newQuantity });
  };

  const isItemInCart = (productId) => {
    return items.some(item => item.id === Number(productId));
  };

  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === Number(productId));
    return item ? item.quantity : 0;
  };

  return {
    // Данные
    cartItems: items,
    formattedCartItems,
    isEmpty: items.length === 0,
    calculations,
    
    // Состояния
    isLoading,
    error,
    isAdding,
    isUpdating,
    isSyncing,
    
    // Действия
    addToCart: (product, quantity = 1) => addToCart({ product, quantity }),
    updateQuantity: (productId, quantity) => updateQuantity({ productId, quantity }),
    incrementItem,
    decrementItem,
    syncCart,
    
    // Утилиты
    isItemInCart,
    getItemQuantity,
  };
};
