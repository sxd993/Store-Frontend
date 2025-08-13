import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '../../../shared/api/client';

// API функция для создания заказа
const createOrder = async (userId) => {
  const response = await client.post('/orders', {
    user_id: userId
  });
  return response.data.data;
};

// Хук для создания заказа
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    
    onSuccess: (orderData) => {
      // Очищаем корзину в кэше, так как на бэкенде она уже очищена
      queryClient.setQueryData(['cart'], []);
      
      // Инвалидируем кэш заказов, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Добавляем созданный заказ в кэш для мгновенного доступа
      queryClient.setQueryData(['order', orderData.id], orderData);
      
      console.log('Заказ успешно создан:', orderData);
    },
    
    onError: (error) => {
      console.error('Ошибка создания заказа:', error);
      
      // Можно добавить toast уведомления
      // toast.error(error.response?.data?.message || 'Ошибка создания заказа');
    },
    
    // Настройки для оптимизации UX
    retry: (failureCount, error) => {
      // Не повторяем запрос при ошибках валидации (400)
      if (error.response?.status === 400) {
        return false;
      }
      // Повторяем до 2 раз при серверных ошибках
      return failureCount < 2;
    },
    
    // Таймаут для запроса
    meta: {
      timeout: 10000 // 10 секунд
    }
  });
};