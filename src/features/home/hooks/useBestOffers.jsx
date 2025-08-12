import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bestOffersApi } from '../api/bestOffersApi';

export const useBestOffers = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['best-offers'],
    queryFn: async () => {
      const response = await bestOffersApi.get();
      return response.data;
    },
    staleTime: 1000 * 60 * 5
  });

  const updateMutation = useMutation({
    mutationFn: bestOffersApi.update,
    onSuccess: (response) => {
      queryClient.setQueryData(['best-offers'], response.data);
    }
  });

  // Функция для обновления одного товара
  const updateSingleOffer = (index, newId) => {
    const currentIds = [...(data?.configuredIds || [])];
    currentIds[index] = newId;
    updateMutation.mutate(currentIds);
  };

  return {
    products: data?.products || [],
    configuredIds: data?.configuredIds || [],
    isLoading,
    error,
    updateOffers: updateMutation.mutate,
    updateSingleOffer,
    isUpdating: updateMutation.isPending
  };
};