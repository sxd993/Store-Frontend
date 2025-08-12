import { useCallback } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useCartStorage } from './useCartStorage';
import { useCartApi } from './useCartApi';
import { validateCartItem, validateQuantity } from '../utils/cartValidation';

export const useCartActions = () => {
  const { isAuthenticated } = useAuth();
  const storageCart = useCartStorage();
  const apiCart = useCartApi();

  // Добавить товар в корзину
  const addToCart = useCallback(async (product, quantity = 1) => {
    try {
      // Валидация товара и количества
      const itemValidation = validateCartItem(product);
      if (!itemValidation.isValid) {
        throw new Error(itemValidation.errors.join(', '));
      }

      const quantityValidation = validateQuantity(quantity);
      if (!quantityValidation.isValid) {
        throw new Error(quantityValidation.errors.join(', '));
      }

      // Всегда добавляем в localStorage
      const localResult = await storageCart.addItem(product, quantityValidation.validQuantity);
      if (!localResult.success) {
        throw new Error(localResult.error);
      }

      // Если пользователь авторизован, также добавляем на сервер
      if (isAuthenticated) {
        try {
          await apiCart.addToServerCart({
            productId: product.id,
            quantity: quantityValidation.validQuantity
          });
        } catch (serverError) {
          console.warn('Ошибка добавления на сервер, товар сохранен локально:', serverError);
          // Не выбрасываем ошибку, так как товар уже добавлен локально
        }
      }

      return { success: true, message: 'Товар добавлен в корзину' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, storageCart, apiCart]);

  // Обновить количество товара
  const updateQuantity = useCallback(async (productId, quantity) => {
    try {
      if (quantity > 0) {
        const quantityValidation = validateQuantity(quantity);
        if (!quantityValidation.isValid) {
          throw new Error(quantityValidation.errors.join(', '));
        }
      }

      // Обновляем в localStorage
      const localResult = await storageCart.updateItem(productId, quantity);
      if (!localResult.success) {
        throw new Error(localResult.error);
      }

      // Если пользователь авторизован, обновляем на сервере
      if (isAuthenticated) {
        try {
          await apiCart.updateServerCartItem({ productId, quantity });
        } catch (serverError) {
          console.warn('Ошибка обновления на сервере:', serverError);
        }
      }

      return { success: true, message: 'Количество обновлено' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, storageCart, apiCart]);

  // Удалить товар из корзины
  const removeFromCart = useCallback(async (productId) => {
    try {
      // Удаляем из localStorage
      const localResult = await storageCart.removeItem(productId);
      if (!localResult.success) {
        throw new Error(localResult.error);
      }

      // Если пользователь авторизован, удаляем с сервера
      if (isAuthenticated) {
        try {
          await apiCart.removeFromServerCart(productId);
        } catch (serverError) {
          console.warn('Ошибка удаления с сервера:', serverError);
        }
      }

      return { success: true, message: 'Товар удален из корзины' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, storageCart, apiCart]);

  // Очистить корзину
  const clearCart = useCallback(async () => {
    try {
      // Очищаем localStorage
      const localResult = await storageCart.clearCart();
      if (!localResult.success) {
        throw new Error(localResult.error);
      }

      // Если пользователь авторизован, очищаем на сервере
      if (isAuthenticated) {
        try {
          await apiCart.clearServerCart();
        } catch (serverError) {
          console.warn('Ошибка очистки на сервере:', serverError);
        }
      }

      return { success: true, message: 'Корзина очищена' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, storageCart, apiCart]);

  // Синхронизировать корзину при авторизации
  const syncCartOnAuth = useCallback(async () => {
    if (!isAuthenticated || storageCart.cartItems.length === 0) {
      return { success: true };
    }

    try {
      await apiCart.syncCart(storageCart.cartItems);
      return { success: true, message: 'Корзина синхронизирована' };
    } catch (error) {
      console.warn('Ошибка синхронизации корзины:', error);
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, storageCart.cartItems, apiCart]);

  // Увеличить количество товара на 1
  const incrementItem = useCallback(async (productId) => {
    const currentQuantity = storageCart.getItemQuantityInCart(productId);
    return await updateQuantity(productId, currentQuantity + 1);
  }, [storageCart, updateQuantity]);

  // Уменьшить количество товара на 1
  const decrementItem = useCallback(async (productId) => {
    const currentQuantity = storageCart.getItemQuantityInCart(productId);
    if (currentQuantity <= 1) {
      return await removeFromCart(productId);
    }
    return await updateQuantity(productId, currentQuantity - 1);
  }, [storageCart, updateQuantity, removeFromCart]);

  return {
    // Основные действия
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    syncCartOnAuth,

    // Удобные действия
    incrementItem,
    decrementItem,

    // Состояния загрузки
    isLoading: storageCart.isLoading || apiCart.isAddingToCart || apiCart.isUpdatingCart || apiCart.isRemovingFromCart,
    isAdding: apiCart.isAddingToCart,
    isUpdating: apiCart.isUpdatingCart,
    isRemoving: apiCart.isRemovingFromCart,
    isClearing: apiCart.isClearingCart,
    isSyncing: apiCart.isSyncing
  };
};