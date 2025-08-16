// src/features/catalog/components/FilterContainer.jsx
import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from 'react-router-dom';
import { useFilterData } from '../hooks/useFilterData';
import { Filter } from '../ui/Filter/Filter';
import { ActiveFilters } from '../ui/Filter/ActiveFilters';
import { FILTER_CONFIG, getDefaultFilterValues } from '../../../shared/config/filterConfig';

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
    
    // Состояние активных фильтров (примененных)
    const [appliedFilters, setAppliedFilters] = useState({});
    
    // Состояние временных фильтров (в модальном окне)
    const [tempFilterValues, setTempFilterValues] = useState(getDefaultFilterValues());

    // Инициализация фильтров из URL при загрузке
    useEffect(() => {
        const urlFilters = {};
        for (const [key, value] of searchParams.entries()) {
            if (value && value !== 'all') {
                urlFilters[key] = value;
            }
        }
        setAppliedFilters(urlFilters);
        
        // Устанавливаем временные значения на основе URL
        const newTempValues = { ...getDefaultFilterValues() };
        Object.entries(urlFilters).forEach(([key, value]) => {
            newTempValues[key] = value;
        });
        setTempFilterValues(newTempValues);
    }, []);

    // Уведомляем родителя об изменениях примененных фильтров
    useEffect(() => {
        if (onFiltersChange) {
            onFiltersChange(appliedFilters);
        }
    }, [appliedFilters, onFiltersChange]);

    // Создаем объект для запроса динамических фильтров
    // Передаем только те фильтры, которые имеют значение
    const filtersForQuery = useMemo(() => {
        const filters = {};
        Object.entries(tempFilterValues).forEach(([key, value]) => {
            if (value && 
                value !== 'all' && 
                value !== 'Все категории' && 
                value !== 'Все бренды' &&
                value !== 'Любая' &&
                value !== 'Любой') {
                filters[key] = value;
            }
        });
        return filters;
    }, [tempFilterValues]);

    // Загружаем данные для фильтров с учетом текущих выбранных значений
    const { data, error, isLoading, refetch } = useFilterData(filtersForQuery);

    // Обработчик изменения фильтра с автоматическим обновлением опций
    const handleFilterChange = useCallback((filterKey, value) => {
        console.log(`Изменение фильтра ${filterKey} на ${value}`);
        
        setTempFilterValues(prev => {
            const newValues = { ...prev, [filterKey]: value };
            
            // При изменении категории сбрасываем зависимые фильтры
            if (filterKey === 'category') {
                // Сбрасываем модель и память, так как они зависят от категории
                newValues.model = 'all';
                newValues.memory = 'Любая';
                // Если меняем категорию, может потребоваться сбросить и цвет
                if (prev.category !== value) {
                    newValues.color = 'Любой';
                }
            }
            
            // При изменении бренда сбрасываем модель
            if (filterKey === 'brand') {
                newValues.model = 'all';
            }
            
            return newValues;
        });
    }, []);

    // Создаем setters для каждого фильтра
    const filterSetters = useMemo(() => {
        return FILTER_CONFIG.reduce((acc, filter) => {
            acc[filter.key] = (value) => handleFilterChange(filter.key, value);
            return acc;
        }, {});
    }, [handleFilterChange]);

    // Обработчик применения фильтров
    const handleApply = useCallback(async () => {
        setIsApplying(true);
        try {
            const activeFilters = {};
            
            // Собираем активные фильтры из временных значений
            FILTER_CONFIG.forEach(filter => {
                const value = tempFilterValues[filter.key];
                
                if (value && 
                    value !== filter.defaultValue && 
                    value !== 'all' &&
                    value !== 'Все категории' &&
                    value !== 'Все бренды' &&
                    value !== 'Любая' &&
                    value !== 'Любой') {
                    activeFilters[filter.key] = value;
                }
            });

            console.log('Применяем фильтры:', activeFilters);

            // Применяем фильтры
            setAppliedFilters(activeFilters);
            
            // Обновляем URL
            const newSearchParams = new URLSearchParams();
            Object.entries(activeFilters).forEach(([key, value]) => {
                newSearchParams.set(key, value);
            });
            setSearchParams(newSearchParams, { replace: true });
            
            // Закрываем модальные окна
            setIsMobileFilterOpen(false);
            setIsDesktopFilterOpen(false);
        } catch (error) {
            console.error('Ошибка применения фильтров:', error);
        } finally {
            setIsApplying(false);
        }
    }, [tempFilterValues, setSearchParams]);

    // Обработчик сброса фильтров
    const handleReset = useCallback(() => {
        const defaultValues = getDefaultFilterValues();
        setTempFilterValues(defaultValues);
        // При сбросе не применяем сразу, а ждем нажатия "Применить"
    }, []);

    // Обработчики открытия модальных окон
    const handleOpenMobile = useCallback(() => {
        // Синхронизируем временные значения с примененными при открытии
        const newTempValues = { ...getDefaultFilterValues() };
        Object.entries(appliedFilters).forEach(([key, value]) => {
            newTempValues[key] = value;
        });
        setTempFilterValues(newTempValues);
        setIsMobileFilterOpen(true);
    }, [appliedFilters]);

    const handleOpenDesktop = useCallback(() => {
        // Синхронизируем временные значения с примененными при открытии
        const newTempValues = { ...getDefaultFilterValues() };
        Object.entries(appliedFilters).forEach(([key, value]) => {
            newTempValues[key] = value;
        });
        setTempFilterValues(newTempValues);
        setIsDesktopFilterOpen(true);
    }, [appliedFilters]);

    // Обработчики закрытия модальных окон
    const handleCloseMobile = useCallback(() => {
        // При закрытии восстанавливаем примененные фильтры
        const newTempValues = { ...getDefaultFilterValues() };
        Object.entries(appliedFilters).forEach(([key, value]) => {
            newTempValues[key] = value;
        });
        setTempFilterValues(newTempValues);
        setIsMobileFilterOpen(false);
    }, [appliedFilters]);

    const handleCloseDesktop = useCallback(() => {
        // При закрытии восстанавливаем примененные фильтры
        const newTempValues = { ...getDefaultFilterValues() };
        Object.entries(appliedFilters).forEach(([key, value]) => {
            newTempValues[key] = value;
        });
        setTempFilterValues(newTempValues);
        setIsDesktopFilterOpen(false);
    }, [appliedFilters]);

    // Обработчик удаления одного фильтра из активных
    const handleRemoveFilter = useCallback((filterKey) => {
        const newFilters = { ...appliedFilters };
        delete newFilters[filterKey];
        
        setAppliedFilters(newFilters);
        
        // Обновляем временные значения
        const newTempValues = { ...getDefaultFilterValues() };
        Object.entries(newFilters).forEach(([key, value]) => {
            newTempValues[key] = value;
        });
        setTempFilterValues(newTempValues);
        
        // Обновляем URL
        const newSearchParams = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            newSearchParams.set(key, value);
        });
        setSearchParams(newSearchParams, { replace: true });
    }, [appliedFilters, setSearchParams]);

    // Обработчик очистки всех фильтров
    const handleClearAll = useCallback(() => {
        setAppliedFilters({});
        setTempFilterValues(getDefaultFilterValues());
        setSearchParams(new URLSearchParams(), { replace: true });
    }, [setSearchParams]);

    // Форматирование названия фильтра
    const getDisplayFilterName = useCallback((key, value) => {
        if (key === 'category' && CATEGORY_DISPLAY_NAMES[value]) {
            return CATEGORY_DISPLAY_NAMES[value];
        }
        return value;
    }, []);

    // Проверка наличия активных фильтров
    const hasActiveFilters = Object.keys(appliedFilters).length > 0;
    const hasTempActiveFilters = FILTER_CONFIG.some(filter => {
        const value = tempFilterValues[filter.key];
        return value && 
               value !== filter.defaultValue && 
               value !== 'all' &&
               value !== 'Все категории' &&
               value !== 'Все бренды' &&
               value !== 'Любой' &&
               value !== 'Любая';
    });

    return (
        <div className="space-y-6">
            {/* Активные фильтры */}
            {hasActiveFilters && (
                <ActiveFilters
                    filters={appliedFilters}
                    onRemoveFilter={handleRemoveFilter}
                    onClearAll={handleClearAll}
                    getDisplayName={getDisplayFilterName}
                />
            )}

            {/* Компонент фильтров */}
            <Filter
                data={data}
                filterValues={tempFilterValues}
                filterSetters={filterSetters}
                hasActiveFilters={hasTempActiveFilters}
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
                onReset={handleReset}
            />
        </div>
    );
};