import { useQuery } from '@tanstack/react-query';
import { GetFilterCategory } from '../../../shared/api/filters.jsx';

// Отдельный хук для данных фильтров с оптимальным кешированием
export const useFilterData = () => {
  return useQuery({
    queryKey: ['filterOptions'],
    queryFn: GetFilterCategory,
    staleTime: 1000 * 60 * 60, // 1 час - данные фильтров меняются редко
    cacheTime: 1000 * 60 * 60 * 2, // 2 часа в кеше
    retry: 2,
    retryDelay: 1000
  });
};