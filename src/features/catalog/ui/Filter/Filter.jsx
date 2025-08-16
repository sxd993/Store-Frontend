import { memo } from "react";
import { FilterButton } from './FilterButton.jsx';
import { FilterModal } from './FilterModal.jsx';
import { MobileFilter } from './MobileFilter.jsx';

export const Filter = memo(({ 
  data,
  filterValues,
  filterSetters,
  hasActiveFilters,
  isLoading,
  error,
  isMobileFilterOpen,
  isDesktopFilterOpen,
  isApplying,
  onOpenMobile,
  onOpenDesktop,
  onCloseMobile,
  onCloseDesktop,
  onApply,
  onReset
}) => {
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
            hasActiveFilters={hasActiveFilters}
            onClick={onOpenDesktop}
          />
        </div>
      </div>

      {/* Мобильная версия */}
      <div className="flex md:hidden justify-center">
        <div className="w-full max-w-sm">
          <FilterButton
            hasActiveFilters={hasActiveFilters}
            onClick={onOpenMobile}
          />
        </div>
      </div>

      {/* Десктопные фильтры */}
      {isDesktopFilterOpen && (
        <FilterModal
          isOpen={isDesktopFilterOpen}
          onClose={onCloseDesktop}
          data={data}
          filterValues={filterValues}
          filterSetters={filterSetters}
          onApply={onApply}
          onReset={onReset}
          isLoading={isApplying}
        />
      )}

      {/* Мобильные фильтры */}
      {isMobileFilterOpen && (
        <MobileFilter
          data={data}
          filterValues={filterValues}
          filterSetters={filterSetters}
          onApply={onApply}
          onReset={onReset}
          isOpen={isMobileFilterOpen}
          onClose={onCloseMobile}
          isLoading={isApplying}
        />
      )}
    </div>
  );
});

// Мемоизированные компоненты состояний
const FilterLoadingState = memo(() => (
  <div className="w-full flex justify-center">
    <div className="w-full md:max-w-xs">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  </div>
));

const FilterErrorState = memo(({ error }) => (
  <div className="w-full text-center">
    <p className="text-gray-600 font-light">Ошибка загрузки фильтров: {error.message}</p>
  </div>
));