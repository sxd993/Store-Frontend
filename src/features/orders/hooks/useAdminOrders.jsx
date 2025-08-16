import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../api/orderApi';

export const useAdminOrders = (page = 1, per_page = 20) => {
  return useQuery({
    queryKey: ['adminOrders', page, per_page],
    queryFn: () => orderApi.getAllOrdersForAdmin(page, per_page),
    staleTime: 1000 * 60 * 2, // 2 минуты
    retry: 2
  });
};

export const useAdminOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ['adminOrderDetails', orderId],
    queryFn: () => orderApi.getAnyOrderDetails(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5, // 5 минут
    retry: 1
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }) => orderApi.updateOrderStatus(orderId, status),
    onSuccess: () => {
      // Обновляем все связанные кэши
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrderDetails'] });
    }
  });
};