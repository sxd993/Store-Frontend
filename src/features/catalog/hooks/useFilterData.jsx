// src/features/catalog/hooks/useFilterData.jsx
import { useQuery } from '@tanstack/react-query';
import { GetFilterCategory } from '../api/filters';

export const useFilterData = (currentFilters = {}) => {
  console.log('useFilterData вызван с фильтрами:', currentFilters);

  return useQuery({
    queryKey: ['filterOptions', currentFilters],
    queryFn: () => {
      console.log('Запрос опций фильтров с параметрами:', currentFilters);
      return GetFilterCategory(currentFilters);
    },
    staleTime: 0, // Всегда считаем данные устаревшими для динамического обновления
    cacheTime: 1000 * 60 * 5, // 5 минут в кеше
    retry: 1,
    retryDelay: 500,
    keepPreviousData: true, // Сохраняем предыдущие данные при обновлении
    enabled: true, // Всегда включен
    refetchOnWindowFocus: false // Не обновлять при фокусе окна
  });
};