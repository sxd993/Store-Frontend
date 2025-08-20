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
  onGroupToggle,
  isExpanded = false
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

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl mt-2  mb-6 overflow-hidden">
      {/* Активные фильтры */}
      {hasActiveFilters && (
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Активные фильтры
            </h4>
            <button
              onClick={onClearAll}
              className="text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300 font-light px-3 py-1"
            >
              Очистить все
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white text-blue-700 border border-blue-200  transition-all duration-200"
              >
                <span className="mr-2 w-2 h-2 bg-blue-400 rounded-full"></span>
                {getDisplayName(key, value)}
                <button
                  onClick={() => onRemoveFilter(key)}
                  className="ml-3 text-blue-500 hover:text-red-500 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Группы фильтров */}
      <div className="divide-y divide-gray-100">
        {filterConfig.map(config => {
          const options = filterOptions?.[config.dataKey] || [];
          const isExpanded = expandedGroups.includes(config.key);
          const currentValue = filters[config.key] || config.defaultValue;

          // Если нет опций - не показываем
          if (!options.length) return null;

          return (
            <button
              key={config.key}
              onClick={() => onGroupToggle(config.key)}
              className="w-full p-6 hover:bg-gray-50 transition-colors duration-200 text-left group cursor-pointer"
            >
              {/* Заголовок группы */}
              <div className="w-full flex items-center justify-between">
                <span className="text-base font-semibold text-gray-800 transition-colors duration-200">
                  {config.title}
                </span>
                <div className="flex items-center gap-2">
                  {filters[config.key] && filters[config.key] !== config.defaultValue && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-all duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Опции */}
              {isExpanded && (
                <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                  {config.type === 'radio' && (
                    <>
                      {/* Опция "Все" */}
                      <label 
                        className="flex items-center cursor-pointer group"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name={config.key}
                            checked={currentValue === config.defaultValue}
                            onChange={() => onFilterChange(config.key, config.defaultValue)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            currentValue === config.defaultValue 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-300 group-hover:border-blue-400'
                          }`}>
                            {currentValue === config.defaultValue && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-700 transition-colors duration-200">
                          {config.defaultValue === 'all' ? 'Все' : config.defaultValue}
                        </span>
                      </label>
                      
                      {/* Остальные опции */}
                      {options.map(option => (
                        <label 
                          key={option} 
                          className="flex items-center cursor-pointer group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name={config.key}
                              checked={currentValue === option}
                              onChange={() => onFilterChange(config.key, option)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              currentValue === option 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-blue-400'
                            }`}>
                              {currentValue === option && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <span className="ml-3 text-sm text-gray-700 transition-colors duration-200">
                            {getDisplayName(config.key, option)}
                          </span>
                        </label>
                      ))}
                    </>
                  )}

                  {config.type === 'dropdown' && (
                    <div 
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={currentValue}
                        onChange={(e) => onFilterChange(config.key, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer"
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
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});