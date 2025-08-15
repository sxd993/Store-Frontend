import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useFilterData } from '../hooks/useFilterData';
import { useOptimizedFilters } from '../hooks/useOptimizedFilters';
import { Filter } from '../ui/Filter/Filter';
import { ActiveFilters } from '../ui/Filter/ActiveFilters';

// Маппинг категорий для отображения пользователю
const CATEGORY_DISPLAY_NAMES = {
  'телефон': 'Телефоны',
  'наушники': 'Наушники',
  'ноутбук': 'Ноутбуки',
  'часы': 'Часы'
};

export const FilterContainer = ({ onFiltersChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [currentFilters, setCurrentFilters] = useState({});

    // Инициализация фильтров из URL при загрузке
    useEffect(() => {
        const urlFilters = {};

        // Извлекаем все параметры из URL
        for (const [key, value] of searchParams.entries()) {
            if (value && value !== 'all') {
                urlFilters[key] = value;
            }
        }

        setCurrentFilters(urlFilters);
    }, [searchParams]);

    // Отдельный useEffect для уведомления родителя об изменениях фильтров
    useEffect(() => {
        if (onFiltersChange) {
            onFiltersChange(currentFilters);
        }
    }, [currentFilters]);

    // Обработчик применения фильтров
    const handleFiltersApply = useCallback(async (filters) => {
        setCurrentFilters(filters);

        // Обновляем URL при применении фильтров
        const newSearchParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== 'all' && value !== 'Все категории' && value !== 'Все бренды') {
                newSearchParams.set(key, value);
            }
        });

        // Обновляем URL без перезагрузки страницы
        setSearchParams(newSearchParams, { replace: true });

        // Уведомляем родительский компонент
        if (onFiltersChange) {
            onFiltersChange(filters);
        }
    }, [setSearchParams, onFiltersChange]);

    // Используем оптимизированные хуки
    const { data, error, isLoading } = useFilterData();
    const {
        filterValues,
        filterSetters,
        isActive,
        handleApply: originalHandleApply,
        handleReset
    } = useOptimizedFilters(handleFiltersApply);

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

    // Обработчик удаления одного фильтра
    const handleRemoveFilter = useCallback((filterKey) => {
        const newFilters = { ...currentFilters };
        delete newFilters[filterKey];
        handleFiltersApply(newFilters);
    }, [currentFilters, handleFiltersApply]);

    // Обработчик очистки всех фильтров
    const handleClearAll = useCallback(() => {
        handleFiltersApply({});
    }, [handleFiltersApply]);

    // Форматирование названия фильтра для отображения
    const getDisplayFilterName = useCallback((key, value) => {
        if (key === 'category' && CATEGORY_DISPLAY_NAMES[value]) {
            return CATEGORY_DISPLAY_NAMES[value];
        }
        return value;
    }, []);

    // Проверяем есть ли активные фильтры
    const hasActiveFilters = Object.keys(currentFilters).length > 0;

    return (
        <div className="space-y-6">
            {/* Активные фильтры */}
            {hasActiveFilters && (
                <ActiveFilters
                    filters={currentFilters}
                    onRemoveFilter={handleRemoveFilter}
                    onClearAll={handleClearAll}
                    getDisplayName={getDisplayFilterName}
                />
            )}

            {/* Кнопка фильтров */}
            <Filter
                data={data}
                filterValues={filterValues}
                filterSetters={filterSetters}
                hasActiveFilters={isActive}
                isLoading={isLoading}
                error={error}
                isMobileFilterOpen={isMobileFilterOpen}
                isDesktopFilterOpen={isDesktopFilterOpen}
                isApplying={isApplying}
                onOpenMobile={handleOpenMobile}
                onOpenDesktop={handleOpenDesktop}
                onCloseMobile={handleCloseMobile}
                onCloseDesktop={handleCloseDesktop}
                onApply={handleApply}
                onReset={handleResetAndClose}
            />
        </div>
    );
};