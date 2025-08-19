import { CreateOrder } from '../api/CreateOrderApi'
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CreateOrder,
        onSuccess: (orderData) => {
            queryClient.setQueryData(['cart'], []);
            queryClient.invalidateQueries({ queryKey: ['cart'], refetchType: 'active' });
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