import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api/CartApi';
import { useAuth } from '../../auth/hooks/useAuth';
import { useMemo } from 'react';

export const CART_QUERY_KEY = ['cart'];

export const useCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  // Получение корзины
  const {
    data: items = [],
    isLoading,
    error
  } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: cartApi.getCart,
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1
  });

  // Добавление товара
  const addItemMutation = useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    }
  });

  // Обновление количества
  const updateQuantityMutation = useMutation({
    mutationFn: cartApi.updateQuantity,
    onMutate: async ({ productId, quantity }) => {
      // Оптимистичное обновление
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart = queryClient.getQueryData(CART_QUERY_KEY);
      
      queryClient.setQueryData(CART_QUERY_KEY, (old) => {
        if (!old) return old;
        return old
          .map(item => 
            item.id === productId 
              ? { ...item, quantity } 
              : item
          )
          .filter(item => item.quantity > 0);
      });
      
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    }
  });

  // Удаление товара
  const removeItemMutation = useMutation({
    mutationFn: cartApi.removeItem,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart = queryClient.getQueryData(CART_QUERY_KEY);
      
      queryClient.setQueryData(CART_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.filter(item => item.id !== productId);
      });
      
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    }
  });

  // Очистка корзины
  const clearCartMutation = useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      queryClient.setQueryData(CART_QUERY_KEY, []);
    }
  });

  // Вычисления
  const calculations = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = subtotal;

    return {
      subtotal,
      totalItems,
      total
    };
  }, [items]);

  // Вспомогательные функции
  const isInCart = (productId) => items.some(item => item.id === productId);
  const getQuantity = (productId) => items.find(item => item.id === productId)?.quantity || 0;

  return {
    // Данные
    items,
    isEmpty: items.length === 0,
    calculations,
    
    // Состояния
    isLoading,
    error,
    
    // Мутации
    addItem: addItemMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
    
    // Состояния загрузки
    isAdding: addItemMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeItemMutation.isPending,
    isClearing: clearCartMutation.isPending,
    
    // Утилиты
    isInCart,
    getQuantity
  };
};
