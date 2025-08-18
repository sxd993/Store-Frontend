import { useState, useEffect, useCallback } from 'react';
import { useFilters } from '../hooks/Filters/useFilters';
import { FilterSidebar } from '../ui/Filter/FilterSidebar';
import { FILTER_CONFIG } from '../../../shared/config/filterConfig';

export const FiltersContainer = ({ onFiltersChange }) => {
  const {
    filters,
    filterOptions,
    optionsLoading,
    optionsError,
    hasActiveFilters,
    handleFilterChange,
    removeFilter,
    clearAllFilters
  } = useFilters();
  const [expandedGroups, setExpandedGroups] = useState(['category', 'brand']);

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleGroupToggle = useCallback((groupKey) => {
    setExpandedGroups(prev => {
      if (prev.includes(groupKey)) {
        return prev.filter(key => key !== groupKey);
      }
      return [...prev, groupKey];
    });
  }, []);
  return (
    <FilterSidebar
      filters={filters}
      filterOptions={filterOptions}
      filterConfig={FILTER_CONFIG}
      expandedGroups={expandedGroups}
      hasActiveFilters={hasActiveFilters}
      isLoading={optionsLoading}
      error={optionsError}
      onFilterChange={handleFilterChange}
      onRemoveFilter={removeFilter}
      onClearAll={clearAllFilters}
      onGroupToggle={handleGroupToggle}
    />
  );
}