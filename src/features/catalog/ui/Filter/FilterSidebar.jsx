import { memo } from 'react';
import { getDisplayName } from '../../../../shared/config/filterConfig';

export const FilterSidebar = memo(({
  filters,
  filterOptions,
  filterConfig,
  expandedGroups,
  hasActiveFilters,
  isLoading,
  error,
  onFilterChange,
  onRemoveFilter,
  onClearAll,
  onGroupToggle
}) => {
  
  if (isLoading) {
    return (
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-white border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">Ошибка загрузки фильтров</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg">
      {/* Заголовок с кнопкой очистки */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Фильтры</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Очистить все
            </button>
          )}
        </div>
      </div>

      {/* Активные фильтры */}
      {hasActiveFilters && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
              >
                {getDisplayName(key, value)}
                <button
                  onClick={() => onRemoveFilter(key)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Группы фильтров */}
      <div className="divide-y divide-gray-200">
        {filterConfig.map(config => {
          const options = filterOptions?.[config.dataKey] || [];
          const isExpanded = expandedGroups.includes(config.key);
          const currentValue = filters[config.key] || config.defaultValue;

          // Если нет опций - не показываем
          if (!options.length) return null;

          return (
            <div key={config.key} className="p-4">
              {/* Заголовок группы */}
              <button
                onClick={() => onGroupToggle(config.key)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-gray-900">
                  {config.title}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Опции */}
              {isExpanded && (
                <div className="mt-3 space-y-2">
                  {config.type === 'radio' && (
                    <>
                      {/* Опция "Все" */}
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={config.key}
                          checked={currentValue === config.defaultValue}
                          onChange={() => onFilterChange(config.key, config.defaultValue)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          {config.defaultValue === 'all' ? 'Все' : config.defaultValue}
                        </span>
                      </label>
                      
                      {/* Остальные опции */}
                      {options.map(option => (
                        <label key={option} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={config.key}
                            checked={currentValue === option}
                            onChange={() => onFilterChange(config.key, option)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">
                            {getDisplayName(config.key, option)}
                          </span>
                        </label>
                      ))}
                    </>
                  )}

                  {config.type === 'dropdown' && (
                    <select
                      value={currentValue}
                      onChange={(e) => onFilterChange(config.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value={config.defaultValue}>
                        {config.defaultValue === 'all' ? 'Все' : config.defaultValue}
                      </option>
                      {options.map(option => (
                        <option key={option} value={option}>
                          {getDisplayName(config.key, option)}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});