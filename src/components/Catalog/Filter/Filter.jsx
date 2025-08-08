import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { GetFilterCategory } from '../../../api/Catalog/FilterApi';
import { useFilterState } from '../../../hooks/Catalog/useFilterState';
import { useFilterActions } from '../../../hooks/Catalog/useFilterActions';
import { FilterButton } from './FilterButton';
import { FilterModal } from './FilterModal';
import { MobileFilter } from './MobileFilter';

export const Filter = ({ onFiltersApply }) => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ['filterOptions'],
        queryFn: GetFilterCategory,
        staleTime: 1000 * 60 * 60,
    });

    const filterState = useFilterState();
    const filterActions = useFilterActions(filterState, onFiltersApply);

    const closeModals = () => {
        setIsMobileFilterOpen(false);
        setIsDesktopFilterOpen(false);
    };

    const handleApplyFilters = async () => {
        await filterActions.applyFilters();
        closeModals();
    };

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="w-full text-center">
                <p className="text-gray-600 font-light">Ошибка загрузки фильтров: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="w-full mb-3">
            {/* Десктопная версия */}
            <div className="hidden lg:block">
                <FilterButton
                    hasActiveFilters={filterActions.hasActiveFilters}
                    onClick={() => setIsDesktopFilterOpen(true)}
                />
            </div>

            {/* Мобильная версия */}
            <div className="lg:hidden">
                <FilterButton
                    hasActiveFilters={filterActions.hasActiveFilters}
                    onClick={() => setIsMobileFilterOpen(true)}
                />
            </div>

            {/* Десктопные фильтры */}
            <FilterModal
                isOpen={isDesktopFilterOpen}
                onClose={() => setIsDesktopFilterOpen(false)}
                data={data}
                filterState={filterState}
                onApply={handleApplyFilters}
                onReset={filterActions.resetFilters}
            />

            {/* Мобильные фильтры */}
            <MobileFilter
                data={data}
                {...filterState.values}
                {...filterState.setters}
                onApply={handleApplyFilters}
                onReset={filterActions.resetFilters}
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
            />
        </div>
    );
};