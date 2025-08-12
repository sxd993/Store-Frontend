import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth/hooks/useAuth';
import {
  getCartApi,
  addToCartApi,
  updateCartItemApi,
  removeFromCartApi,
  clearCartApi,
  syncCartApi,
  getCartItemsInfoApi
} from '../api/сart';

export const useCartApi = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Получение корзины с сервера
  const {
    data: serverCart = [],
    isLoading: isLoadingCart,
    error: cartError,
    refetch: refetchCart
  } = useQuery({
    queryKey: ['cart', 'server'],
    queryFn: getCartApi,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2, // 2 минуты
    retry: (failureCount, error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    }
  });

  // Добавление товара в корзину на сервере
  const addToServerCart = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', 'server']);
    },
    onError: (error) => {
      console.error('Ошибка добавления товара:', error);
    }
  });

  // Обновление количества на сервере
  const updateServerCartItem = useMutation({
    mutationFn: updateCartItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', 'server']);
    },
    onError: (error) => {
      console.error('Ошибка обновления товара:', error);
    }
  });

  // Удаление товара с сервера
  const removeFromServerCart = useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', 'server']);
    },
    onError: (error) => {
      console.error('Ошибка удаления товара:', error);
    }
  });

  // Очистка корзины на сервере
  const clearServerCart = useMutation({
    mutationFn: clearCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', 'server']);
    },
    onError: (error) => {
      console.error('Ошибка очистки корзины:', error);
    }
  });

  // Синхронизация корзины при авторизации
  const syncCart = useMutation({
    mutationFn: syncCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', 'server']);
    },
    onError: (error) => {
      console.error('Ошибка синхронизации корзины:', error);
    }
  });

  // Получение расширенной информации о товарах
  const getCartItemsInfo = useQuery({
    queryKey: ['cart', 'items-info'],
    queryFn: () => getCartItemsInfoApi(serverCart),
    enabled: isAuthenticated && serverCart.length > 0,
    staleTime: 1000 * 60 * 5 // 5 минут
  });

  return {
    // Данные
    serverCart,
    cartItemsInfo: getCartItemsInfo.data || [],
    
    // Состояния загрузки
    isLoadingCart,
    isLoadingItemsInfo: getCartItemsInfo.isLoading,
    
    // Ошибки
    cartError,
    itemsInfoError: getCartItemsInfo.error,
    
    // Мутации
    addToServerCart: addToServerCart.mutateAsync,
    updateServerCartItem: updateServerCartItem.mutateAsync,
    removeFromServerCart: removeFromServerCart.mutateAsync,
    clearServerCart: clearServerCart.mutateAsync,
    syncCart: syncCart.mutateAsync,
    
    // Состояния мутаций
    isAddingToCart: addToServerCart.isPending,
    isUpdatingCart: updateServerCartItem.isPending,
    isRemovingFromCart: removeFromServerCart.isPending,
    isClearingCart: clearServerCart.isPending,
    isSyncing: syncCart.isPending,
    
    // Ошибки мутаций
    addError: addToServerCart.error,
    updateError: updateServerCartItem.error,
    removeError: removeFromServerCart.error,
    clearError: clearServerCart.error,
    syncError: syncCart.error,
    
    // Рефеч
    refetchCart,
    refetchItemsInfo: getCartItemsInfo.refetch
  };
};