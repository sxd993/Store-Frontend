import { useState, useCallback, useMemo } from 'react';
import { FILTER_CONFIG, getDefaultFilterValues, hasActiveFilters } from '../../../shared/config/filterConfig';

export const useOptimizedFilters = (onFiltersApply) => {
  const [filterValues, setFilterValues] = useState(getDefaultFilterValues());

  // Обработчик изменения одного фильтра
  const handleFilterChange = useCallback((filterKey, value) => {
    setFilterValues(prev => ({
      ...prev,
      [filterKey]: value
    }));
  }, []);

  // Сброс всех фильтров
  const handleReset = useCallback(() => {
    const defaultValues = getDefaultFilterValues();
    setFilterValues(defaultValues);
    
    // Вызываем callback с пустыми фильтрами
    if (onFiltersApply) {
      onFiltersApply({});
    }
  }, [onFiltersApply]);

  // Применение фильтров
  const handleApply = useCallback(async () => {
    const activeFilters = {};

    // Собираем активные фильтры
    FILTER_CONFIG.forEach(filter => {
      const value = filterValues[filter.key];
      
      // Проверяем, что значение не является значением по умолчанию
      if (value && value !== filter.defaultValue && value !== 'all') {
        // Для категории и бренда проверяем специальные значения
        if (filter.key === 'category' && value === 'Все категории') return;
        if (filter.key === 'brand' && value === 'Все бренды') return;
        if (filter.key === 'memory' && value === 'Любая') return;
        if (filter.key === 'color' && value === 'Любой') return;
        
        // Добавляем фильтр в активные
        activeFilters[filter.key] = value;
      }
    });

    console.log('Применяем фильтры:', activeFilters); // Для отладки

    try {
      // Вызываем callback с активными фильтрами
      if (onFiltersApply) {
        await onFiltersApply(activeFilters);
      }
    } catch (error) {
      console.error('Ошибка применения фильтров:', error);
      throw error;
    }
  }, [filterValues, onFiltersApply]);

  // Проверка наличия активных фильтров
  const isActive = useMemo(() => 
    hasActiveFilters(filterValues), 
    [filterValues]
  );

  // Создаем setters для каждого фильтра
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