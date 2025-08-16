// src/shared/ui/DropDownFilter.jsx
import { memo } from 'react';

export const DropDownFilter = memo(({ 
  title, 
  options = [], 
  selectedValue, 
  onChange, 
  compact = false,
  defaultText = 'Выберите',
  disabled = false
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <label className="text-xs text-gray-600 font-light">
        {title} {options.length > 0 && `(${options.length})`}
      </label>
      <select
        value={selectedValue || 'all'}
        onChange={handleChange}
        disabled={disabled || options.length === 0}
        className={`
          w-full px-3 py-2 
          bg-white border border-gray-200 rounded-lg
          text-sm text-gray-900 font-light
          focus:outline-none focus:border-gray-400
          transition-colors duration-200
          ${disabled || options.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-300'}
        `}
      >
        <option value="all">{defaultText}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {options.length === 0 && (
        <p className="text-xs text-gray-500 mt-1">Нет доступных опций</p>
      )}
    </div>
  );
});