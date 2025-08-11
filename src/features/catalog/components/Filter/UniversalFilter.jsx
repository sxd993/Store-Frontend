import { memo, useMemo } from 'react';
import { FILTER_CONFIG } from '../../../../shared/config/filterConfig';
import { RadioFilter } from '../../../../shared/ui/RadioFilter.jsx';
import { DropDownFilter } from '../../../../shared/ui/DropDownFilter.jsx';

// Мемоизированный компонент одного фильтра
const FilterField = memo(({ filter, data, value, onChange }) => {
  const options = data?.[filter.dataKey] || [];
  
  const FilterComponent = filter.type === 'radio' ? RadioFilter : DropDownFilter;
  
  return (
    <FilterComponent
      title={filter.title}
      options={options}
      selectedValue={value}
      onChange={onChange}
    />
  );
});

FilterField.displayName = 'FilterField';

// Мемоизированные кнопки действий
const FilterActions = memo(({ onApply, onReset, isLoading }) => (
  <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
    <button
      onClick={onReset}
      disabled={isLoading}
      className="px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 text-sm disabled:opacity-50"
    >
      Сбросить
    </button>
    <button
      onClick={onApply}
      disabled={isLoading}
      className="px-4 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-sm disabled:opacity-50"
    >
      {isLoading ? 'Применяем...' : 'Применить'}
    </button>
  </div>
));

FilterActions.displayName = 'FilterActions';

// ✅ Универсальный компонент фильтров
export const UniversalFilter = memo(({ 
  data, 
  filterValues, 
  filterSetters, 
  onApply, 
  onReset, 
  isLoading = false,
  className = ""
}) => {
  
  // Мемоизируем конфигурацию фильтров
  const filterFields = useMemo(() => 
    FILTER_CONFIG.map(filter => (
      <FilterField
        key={filter.key}
        filter={filter}
        data={data}
        value={filterValues[filter.key]}
        onChange={filterSetters[filter.key]}
      />
    )), 
    [data, filterValues, filterSetters]
  );

  return (
    <div className={`space-y-2 ${className}`}>
      {filterFields}
      <FilterActions 
        onApply={onApply} 
        onReset={onReset} 
        isLoading={isLoading}
      />
    </div>
  );
});
