import { useState, useCallback, useMemo } from 'react';
import { FILTER_CONFIG, getDefaultFilterValues, hasActiveFilters } from '../../../shared/config/filterConfig';

export const useOptimizedFilters = (onFiltersApply) => {
  const [filterValues, setFilterValues] = useState(getDefaultFilterValues());

  // Мемоизированный обработчик изменения одного фильтра
  const handleFilterChange = useCallback((filterKey, value) => {
    setFilterValues(prev => ({
      ...prev,
      [filterKey]: value
    }));
  }, []);

  // Мемоизированный сброс всех фильтров
  const handleReset = useCallback(() => {
    const defaultValues = getDefaultFilterValues();
    setFilterValues(defaultValues);
    if (onFiltersApply) {
      onFiltersApply({});
    }
  }, [onFiltersApply]);

  // Мемоизированное применение фильтров
  const handleApply = useCallback(async () => {
    const activeFilters = {};

    FILTER_CONFIG.forEach(filter => {
      const value = filterValues[filter.key];
      if (value !== filter.defaultValue) {
        // Маппинг ключей для API
        const apiKey = filter.key === 'memory' ? 'memory' : filter.key;
        activeFilters[apiKey] = value;
      }
    });

    try {
      if (onFiltersApply) {
        await onFiltersApply(activeFilters);
      }
    } catch (error) {
      console.error('Ошибка применения фильтров:', error);
    }
  }, [filterValues, onFiltersApply]);

  // Мемоизированная проверка активных фильтров
  const isActive = useMemo(() => 
    hasActiveFilters(filterValues), 
    [filterValues]
  );

  // Мемоизированные setters для каждого фильтра
  const filterSetters = useMemo(() => {
    return FILTER_CONFIG.reduce((acc, filter) => {
      acc[filter.key] = (value) => handleFilterChange(filter.key, value);
      return acc;
    }, {});
  }, [handleFilterChange]);

  return {
    filterValues,
    filterSetters,
    isActive,
    handleApply,
    handleReset,
    handleFilterChange
  };
};