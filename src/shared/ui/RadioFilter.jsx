// src/shared/ui/RadioFilter.jsx
import { memo } from 'react';

export const RadioFilter = memo(({ 
  title, 
  options = [], 
  selectedValue, 
  onChange, 
  compact = false,
  defaultText = 'Все',
  disabled = false
}) => {
  const handleChange = (value) => {
    if (onChange && !disabled) {
      onChange(value);
    }
  };

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <label className="text-xs text-gray-600 font-light">
        {title} {options.length > 0 && `(${options.length})`}
      </label>
      <div className="space-y-1">
        <label 
          className={`
            flex items-center p-2 rounded-lg cursor-pointer 
            transition-colors duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
            ${selectedValue === 'Все категории' || selectedValue === 'all' ? 'bg-gray-100' : ''}
          `}
        >
          <input
            type="radio"
            name={title}
            value="all"
            checked={selectedValue === 'Все категории' || selectedValue === 'all' || !selectedValue}
            onChange={() => handleChange('Все категории')}
            disabled={disabled}
            className="mr-2 text-gray-600"
          />
          <span className="text-sm text-gray-900 font-light">{defaultText}</span>
        </label>
        
        {options.map(option => (
          <label
            key={option}
            className={`
              flex items-center p-2 rounded-lg cursor-pointer 
              transition-colors duration-200
              ${disabled || options.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
              ${selectedValue === option ? 'bg-gray-100' : ''}
            `}
          >
            <input
              type="radio"
              name={title}
              value={option}
              checked={selectedValue === option}
              onChange={() => handleChange(option)}
              disabled={disabled || options.length === 0}
              className="mr-2 text-gray-600"
            />
            <span className="text-sm text-gray-900 font-light">{option}</span>
          </label>
        ))}
      </div>
      
      {options.length === 0 && (
        <p className="text-xs text-gray-500 mt-1">Нет доступных опций</p>
      )}
    </div>
  );
});