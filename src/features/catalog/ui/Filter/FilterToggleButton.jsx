import { memo } from 'react';

export const FilterToggleButton = memo(({ isOpen, onClick, hasActiveFilters }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200  "
    >
      <span className="text-sm font-medium text-gray-700">
        Фильтры
        {hasActiveFilters && (
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
            {Object.keys(hasActiveFilters).length}
          </span>
        )}
      </span>
      <svg
        className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
});
