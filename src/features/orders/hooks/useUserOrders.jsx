import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../api/orderApi';

export const useUserOrders = (page = 1, per_page = 10) => {
  return useQuery({
    queryKey: ['userOrders', page, per_page],
    queryFn: () => orderApi.getUserOrders(page, per_page),
    staleTime: 1000 * 60 * 2, // 2 минуты
    retry: 2
  });
};

export const useUserOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ['userOrderDetails', orderId],
    queryFn: () => orderApi.getUserOrderDetails(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5, // 5 минут
    retry: 1
  });
};