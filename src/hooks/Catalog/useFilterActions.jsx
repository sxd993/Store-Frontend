import { useCallback, useMemo } from 'react';

export const useFilterActions = (filterState, onFiltersApply) => {
  const { values, resetAll } = filterState;
  const { selectedCategory, selectedBrand, selectedModel, selectedColor, selectedStorage } = values;

  const hasActiveFilters = useMemo(() => {
    return selectedModel !== 'all' || 
           selectedColor !== 'all' || 
           selectedStorage !== 'all' ||
           selectedCategory !== 'Все категории' || 
           selectedBrand !== 'Все бренды';
  }, [selectedModel, selectedColor, selectedStorage, selectedCategory, selectedBrand]);

  const resetFilters = useCallback(() => {
    resetAll();
    if (onFiltersApply) {
      onFiltersApply({});
    }
  }, [resetAll, onFiltersApply]);

  const applyFilters = useCallback(async () => {
    const activeFilters = {};

    if (selectedCategory !== 'Все категории') {
      activeFilters.category = selectedCategory;
    }
    if (selectedBrand !== 'Все бренды') {
      activeFilters.brand = selectedBrand;
    }
    if (selectedModel !== 'all') {
      activeFilters.model = selectedModel;
    }
    if (selectedColor !== 'all') {
      activeFilters.color = selectedColor;
    }
    if (selectedStorage !== 'all') {
      activeFilters.memory = selectedStorage;
    }

    try {
      if (onFiltersApply) {
        await onFiltersApply(activeFilters);
      }
    } catch (error) {
      console.error('Ошибка применения фильтров:', error);
    }
  }, [selectedCategory, selectedBrand, selectedModel, selectedColor, selectedStorage, onFiltersApply]);

  return {
    hasActiveFilters,
    resetFilters,
    applyFilters
  };
};