import { CART_QUERY_KEY } from './useCart';
import { createOrder } from '../../../shared/api/orderApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,
        onSuccess: (orderData) => {
            queryClient.setQueryData(CART_QUERY_KEY, []);
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY, refetchType: 'active' });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.setQueryData(['order', orderData.id], orderData);
            console.log('Заказ успешно создан:', orderData);
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