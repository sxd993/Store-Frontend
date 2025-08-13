import { memo, useMemo } from 'react';
import { FILTER_CONFIG } from '../../../../shared/config/filterConfig';
import { RadioFilter } from '../../../../shared/ui/RadioFilter.jsx';
import { DropDownFilter } from '../../../../shared/ui/DropDownFilter.jsx';

// Мемоизированный компонент одного фильтра
const FilterField = memo(({ filter, data, value, onChange }) => {
  const options = data?.[filter.dataKey] || [];
  
  const FilterComponent = filter.type === 'radio' ? RadioFilter : DropDownFilter;
  
  // Компактный режим для цвета и памяти
  const isCompact = filter.key === 'color' || filter.key === 'memory';
  
  // Правильные формы для грамматики
  const getDefaultText = (filterKey) => {
    if (filterKey === 'memory') return 'Любая';
    if (filterKey === 'color') return 'Любой';
    return `Все ${filter.title.toLowerCase()}`;
  };
  
  return (
    <FilterComponent
      title={filter.title}
      options={options}
      selectedValue={value}
      onChange={onChange}
      compact={isCompact}
      defaultText={getDefaultText(filter.key)}
    />
  );
});

FilterField.displayName = 'FilterField';

// Компактные кнопки действий в стиле пользователя
const FilterActions = memo(({ onApply, onReset, isLoading }) => (
  <div className="flex gap-2 pt-3 border-t border-gray-100">
    <button
      onClick={onReset}
      disabled={isLoading}
      className="flex-1 px-3 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 text-sm disabled:opacity-50 rounded-2xl"
    >
      Сбросить
    </button>
    <button
      onClick={onApply}
      disabled={isLoading}
      className="flex-1 px-3 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-sm disabled:opacity-50 rounded-2xl"
    >
      {isLoading ? 'Применяем...' : 'Применить'}
    </button>
  </div>
));

FilterActions.displayName = 'FilterActions';

// ✅ Компактный универсальный компонент фильтров
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
    <div className={`space-y-3 ${className}`}>
      {filterFields}
      <FilterActions 
        onApply={onApply} 
        onReset={onReset} 
        isLoading={isLoading}
      />
    </div>
  );
});
