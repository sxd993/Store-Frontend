import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth/hooks/useAuth';
import { useCartStore } from '../../../shared/store/cartStore';
import { getCartApi, addToCartApi, updateCartItemApi, removeFromCartApi } from '../api/CartApi';

export const useCartApi = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { 
    localItems, 
    addToLocal, 
    updateLocalQuantity, 
    setOptimisticItems, 
    clearOptimistic 
  } = useCartStore();

  // Получение корзины
  const {
    data: serverCart = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartApi,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 минут
    gcTime: 1000 * 60 * 10, // 10 минут
  });

  // Мутация добавления в корзину
  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }) => addToCartApi({ productId, quantity }),
    onMutate: async ({ product, quantity }) => {
      if (!isAuthenticated) {
        addToLocal(product, quantity);
        return;
      }

      // Optimistic update для сервера
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);
      
      const optimisticCart = previousCart ? [...previousCart] : [];
      const existingIndex = optimisticCart.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        optimisticCart[existingIndex].quantity += quantity;
      } else {
        optimisticCart.push({ ...product, quantity });
      }
      
      queryClient.setQueryData(['cart'], optimisticCart);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  // Мутация обновления количества
  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }) => 
      quantity === 0 
        ? removeFromCartApi(productId)
        : updateCartItemApi({ productId, quantity }),
    onMutate: async ({ productId, quantity }) => {
      if (!isAuthenticated) {
        updateLocalQuantity(productId, quantity);
        return;
      }

      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);
      
      const optimisticCart = previousCart ? [...previousCart] : [];
      if (quantity === 0) {
        const filtered = optimisticCart.filter(item => item.id !== productId);
        queryClient.setQueryData(['cart'], filtered);
      } else {
        const updated = optimisticCart.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
        queryClient.setQueryData(['cart'], updated);
      }
      
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  // Синхронизация при авторизации
  const syncMutation = useMutation({
    mutationFn: (localItems) => syncCartApi(localItems),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      useCartStore.getState().clearLocal();
    }
  });

  return {
    // Данные
    items: isAuthenticated ? serverCart : localItems,
    isLoading: isAuthenticated ? isLoading : false,
    error,
    
    // Мутации
    addToCart: addMutation.mutate,
    updateQuantity: updateMutation.mutate,
    syncCart: syncMutation.mutate,
    
    // Состояния загрузки
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isSyncing: syncMutation.isPending,
  };
};