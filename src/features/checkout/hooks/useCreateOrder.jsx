import { CreateOrder } from '../api/CreateOrderApi'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../../cart/api/CartApi';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CreateOrder,
        onSuccess: async (orderData) => {
            try {
                // Очищаем корзину на сервере
                await cartApi.clearCart();
                
                // Очищаем кеш корзины
                queryClient.setQueryData(['cart'], []);
                queryClient.invalidateQueries({ queryKey: ['cart'], refetchType: 'active' });
                
                // Обновляем кеш заказов
                queryClient.invalidateQueries({ queryKey: ['orders'] });
                queryClient.setQueryData(['order', orderData.id], orderData);
                
                console.log('Заказ успешно создан, корзина очищена:', orderData);
            } catch (error) {
                console.error('Ошибка при очистке корзины:', error);
                // Даже если очистка корзины не удалась, заказ уже создан
                // Очищаем кеш корзины локально
                queryClient.setQueryData(['cart'], []);
            }
        },
        onError: (error) => {
            console.error('Ошибка создания заказа:', error);
        },
        retry: (failureCount, error) => {
            if (error.response?.status === 400) return false;
            return failureCount < 2;
        },
        meta: { timeout: 10000 }
    });
};