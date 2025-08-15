import { memo } from 'react';

export const ActiveFilters = memo(({ 
  filters = {},
  onRemoveFilter,
  onClearAll,
  getDisplayName
}) => {
  const filterEntries = Object.entries(filters);

  if (filterEntries.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-sm text-gray-600 font-light">Активные фильтры:</span>
      
      {filterEntries.map(([key, value]) => (
        <FilterTag
          key={`${key}-${value}`}
          filterKey={key}
          value={value}
          displayName={getDisplayName ? getDisplayName(key, value) : value}
          onRemove={onRemoveFilter}
        />
      ))}
      
      {filterEntries.length > 1 && (
        <ClearAllButton onClick={onClearAll} />
      )}
    </div>
  );
});

// Компонент тега фильтра
const FilterTag = memo(({ filterKey, value, displayName, onRemove }) => (
  <span className="inline-flex items-center py-1 rounded-lg text-sm font-light bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300">
    <span className="mr-1 ml-2">
      {displayName}
    </span>
    <button
      onClick={() => onRemove && onRemove(filterKey)}
      className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
      aria-label={`Убрать фильтр ${displayName}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
));

// Кнопка очистки всех фильтров
const ClearAllButton = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm font-light text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-colors duration-300"
    aria-label="Очистить все фильтры"
  >
    Очистить все
  </button>
));