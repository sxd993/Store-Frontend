import { useState, useCallback, useEffect } from 'react';
import {
  getCartFromStorage,
  saveCartToStorage,
  addItemToStorage,
  updateItemInStorage,
  removeItemFromStorage,
  clearStorage,
  getCartItemsCount,
  isItemInCart as checkItemInStorage,
  getItemQuantity
} from '../api/cartStorage';
import { validateCartItem, validateQuantity } from '../utils/cartValidation';

export const useCartStorage = () => {
  const [cartItems, setCartItems] = useState(() => getCartFromStorage());
  const [isLoading, setIsLoading] = useState(false);

  // Синхронизация с localStorage при изменениях
  const updateStorage = useCallback((newCart) => {
    setCartItems(newCart);
    saveCartToStorage(newCart);
  }, []);

  // Добавить товар в корзину
  const addItem = useCallback(async (product, quantity = 1) => {
    setIsLoading(true);
    try {
      // Валидация товара
      const itemValidation = validateCartItem(product);
      if (!itemValidation.isValid) {
        throw new Error(itemValidation.errors.join(', '));
      }

      // Валидация количества
      const quantityValidation = validateQuantity(quantity);
      if (!quantityValidation.isValid) {
        throw new Error(quantityValidation.errors.join(', '));
      }

      const updatedCart = addItemToStorage(product, quantityValidation.validQuantity);
      updateStorage(updatedCart);
      
      return { success: true, cart: updatedCart };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [updateStorage]);

  // Обновить количество товара
  const updateItem = useCallback(async (productId, quantity) => {
    setIsLoading(true);
    try {
      const quantityValidation = validateQuantity(quantity);
      if (!quantityValidation.isValid && quantity !== 0) {
        throw new Error(quantityValidation.errors.join(', '));
      }

      const updatedCart = updateItemInStorage(productId, quantity);
      updateStorage(updatedCart);
      
      return { success: true, cart: updatedCart };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [updateStorage]);

  // Удалить товар
  const removeItem = useCallback(async (productId) => {
    setIsLoading(true);
    try {
      const updatedCart = removeItemFromStorage(productId);
      updateStorage(updatedCart);
      
      return { success: true, cart: updatedCart };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [updateStorage]);

  // Очистить корзину
  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      clearStorage();
      updateStorage([]);
      
      return { success: true, cart: [] };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [updateStorage]);

  // Установить всю корзину (для синхронизации)
  const setCart = useCallback((newCart) => {
    updateStorage(Array.isArray(newCart) ? newCart : []);
  }, [updateStorage]);

  // Получить количество товаров
  const itemsCount = getCartItemsCount();

  // Проверить наличие товара в корзине
  const isItemInCart = useCallback((productId) => {
    return checkItemInStorage(productId);
  }, []);

  // Получить количество конкретного товара
  const getItemQuantityInCart = useCallback((productId) => {
    return getItemQuantity(productId);
  }, []);

  // Обновление при изменениях в других вкладках
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'nnv_cart') {
        setCartItems(getCartFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    cartItems,
    itemsCount,
    isLoading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    setCart,
    isItemInCart,
    getItemQuantityInCart
  };
};