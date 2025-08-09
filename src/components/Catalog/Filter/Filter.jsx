import { useState, useCallback, memo } from "react";
import { useFilterData } from '../../../hooks/Catalog/useFilterData';
import { useOptimizedFilters } from '../../../hooks/Catalog/useOptimizedFilters';
import { FilterButton } from './FilterButton';
import { FilterModal } from './FilterModal';
import { MobileFilter } from './MobileFilter';

export const Filter = memo(({ onFiltersApply }) => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    // Используем оптимизированные хуки
    const { data, error, isLoading } = useFilterData();
    const {
        filterValues,
        filterSetters,
        isActive,
        handleApply: originalHandleApply,
        handleReset
    } = useOptimizedFilters(onFiltersApply);

    // Мемоизированные обработчики модалок
    const handleOpenMobile = useCallback(() => {
        setIsMobileFilterOpen(true);
    }, []);

    const handleOpenDesktop = useCallback(() => {
        setIsDesktopFilterOpen(true);
    }, []);

    const handleCloseMobile = useCallback(() => {
        setIsMobileFilterOpen(false);
    }, []);

    const handleCloseDesktop = useCallback(() => {
        setIsDesktopFilterOpen(false);
    }, []);

    const handleCloseAll = useCallback(() => {
        setIsMobileFilterOpen(false);
        setIsDesktopFilterOpen(false);
    }, []);

    // Обработчик применения с loading состоянием
    const handleApply = useCallback(async () => {
        setIsApplying(true);
        try {
            await originalHandleApply();
            handleCloseAll();
        } catch (error) {
            console.error('Ошибка применения фильтров:', error);
        } finally {
            setIsApplying(false);
        }
    }, [originalHandleApply, handleCloseAll]);

    // Обработчик сброса
    const handleResetAndClose = useCallback(() => {
        handleReset();
        handleCloseAll();
    }, [handleReset, handleCloseAll]);

    // Состояния загрузки
    if (isLoading) {
        return <FilterLoadingState />;
    }
    
    if (error) {
        return <FilterErrorState error={error} />;
    }

    return (
        <div className="w-full mb-3">
            {/* Десктопная версия */}
            <div className="hidden lg:block">
                <FilterButton
                    hasActiveFilters={isActive}
                    onClick={handleOpenDesktop}
                />
            </div>

            {/* Мобильная версия */}
            <div className="lg:hidden">
                <FilterButton
                    hasActiveFilters={isActive}
                    onClick={handleOpenMobile}
                />
            </div>

            {/* Десктопные фильтры */}
            <FilterModal
                isOpen={isDesktopFilterOpen}
                onClose={handleCloseDesktop}
                data={data}
                filterValues={filterValues}
                filterSetters={filterSetters}
                onApply={handleApply}
                onReset={handleResetAndClose}
                isLoading={isApplying}
            />

            {/* Мобильные фильтры */}
            <MobileFilter
                data={data}
                filterValues={filterValues}
                filterSetters={filterSetters}
                onApply={handleApply}
                onReset={handleResetAndClose}
                isOpen={isMobileFilterOpen}
                onClose={handleCloseMobile}
                isLoading={isApplying}
            />
        </div>
    );
});

// Мемоизированные компоненты состояний
const FilterLoadingState = memo(() => (
    <div className="w-full">
        <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
        </div>
    </div>
));

const FilterErrorState = memo(({ error }) => (
    <div className="w-full text-center">
        <p className="text-gray-600 font-light">Ошибка загрузки фильтров: {error.message}</p>
    </div>
));