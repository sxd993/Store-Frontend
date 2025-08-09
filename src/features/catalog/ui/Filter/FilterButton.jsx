import { memo } from 'react';

export const FilterButton = memo(({ hasActiveFilters, onClick }) => {
  return (
    <button
      type="button"
      aria-label="Открыть фильтры"
      onClick={onClick}
      className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-300 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
          </svg>
          <span className="text-sm font-light text-gray-900">Фильтры</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          )}
        </div>
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
});
