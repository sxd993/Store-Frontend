import { useState, useCallback, memo } from "react";
import { useFilterData } from '../../../hooks/useFilterData.jsx';
import { useOptimizedFilters } from '../../../hooks/useOptimizedFilters.jsx';
import { FilterButton } from './FilterButton.jsx';
import { FilterModal } from './FilterModal.jsx';
import { MobileFilter } from './MobileFilter.jsx';

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
        <div className="w-full mb-6">
            {/* Десктопная версия */}
            <div className="hidden md:flex justify-center">
                <div className="w-full md:max-w-xs">
                    <FilterButton
                        hasActiveFilters={isActive}
                        onClick={handleOpenDesktop}
                    />
                </div>
            </div>

            {/* Мобильная версия */}
            <div className="flex md:hidden justify-center">
                <div className="w-full max-w-sm">
                    <FilterButton
                        hasActiveFilters={isActive}
                        onClick={handleOpenMobile}
                    />
                </div>
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