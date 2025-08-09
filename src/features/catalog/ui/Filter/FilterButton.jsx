import { memo } from 'react';

export const FilterButton = memo(({ hasActiveFilters, onClick }) => {
  return (
    <div className="bg-white border border-gray-200 p-3">
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
        <button
          onClick={onClick}
          className="px-3 py-1.5 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-sm"
        >
          Открыть
        </button>
      </div>
    </div>
  );
});