import { useQuery } from '@tanstack/react-query';
import { GetFilterCategory } from '../api/filters';

export const useFilterData = () => {
  return useQuery({
    queryKey: ['filterOptions'],
    queryFn: GetFilterCategory,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 2,
    retry: 2,
    retryDelay: 1000
  });
};