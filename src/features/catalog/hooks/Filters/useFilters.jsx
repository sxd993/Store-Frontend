import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetFilterCategory } from '../../api/filters';


export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Читаем фильтры из URL при загрузке
  useEffect(() => {
    if (!isInitialized) {
      const urlFilters = {};
      
      for (const [key, value] of searchParams.entries()) {
        if (value && value !== 'all') {
          urlFilters[key] = value;
        }
      }
      
      setFilters(urlFilters);
      setIsInitialized(true);
    }
  }, [searchParams, isInitialized]);

  // Загружаем доступные опции с бэка
  const { 
    data: filterOptions, 
    isLoading: optionsLoading,
    error: optionsError,
    refetch: refetchOptions 
  } = useQuery({
    queryKey: ['filterOptions', filters],
    queryFn: () => GetFilterCategory(filters),
    staleTime: 1000 * 60 * 5, // 5 минут
    keepPreviousData: true,
    enabled: isInitialized
  });

  // Обновляем URL
  const updateURL = useCallback((newFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      }
    });
    
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Меняем фильтр
  const handleFilterChange = useCallback((filterKey, value) => {
    const newFilters = { ...filters };
    
    // Если пустое значение - удаляем
    if (!value || value === 'all' || value === 'Любая' || value === 'Любой') {
      delete newFilters[filterKey];
    } else {
      newFilters[filterKey] = value;
    }
    
    setFilters(newFilters);
    updateURL(newFilters);
  }, [filters, updateURL]);

  // Удаляем один фильтр
  const removeFilter = useCallback((filterKey) => {
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    
    setFilters(newFilters);
    updateURL(newFilters);
  }, [filters, updateURL]);

  // Очищаем все фильтры
  const clearAllFilters = useCallback(() => {
    setFilters({});
    updateURL({});
  }, [updateURL]);

  // Есть ли активные фильтры
  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).length > 0;
  }, [filters]);

  return {
    // Данные
    filters,
    filterOptions,
    optionsLoading,
    optionsError,
    hasActiveFilters,
    
    // Методы
    handleFilterChange,
    removeFilter,
    clearAllFilters,
    refetchOptions
  };
};