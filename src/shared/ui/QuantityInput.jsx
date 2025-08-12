import { useState, useCallback } from 'react';

export const QuantityInput = ({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'medium',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(String(value));

  const sizeClasses = {
    small: 'h-8 text-sm',
    medium: 'h-10 text-base',
    large: 'h-12 text-lg'
  };

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, Number(value) + 1);
    onChange(newValue);
    setInputValue(String(newValue));
  }, [value, max, onChange]);

  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, Number(value) - 1);
    onChange(newValue);
    setInputValue(String(newValue));
  }, [value, min, onChange]);

  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Валидация и обновление только если значение корректно
    const numValue = Number(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  }, [min, max, onChange]);

  const handleBlur = useCallback(() => {
    // При потере фокуса устанавливаем корректное значение
    const numValue = Number(inputValue);
    const correctedValue = isNaN(numValue) 
      ? value 
      : Math.max(min, Math.min(max, numValue));
    
    setInputValue(String(correctedValue));
    if (correctedValue !== value) {
      onChange(correctedValue);
    }
  }, [inputValue, value, min, max, onChange]);

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || Number(value) <= min}
        className={`flex items-center justify-center w-8 ${sizeClasses[size]} border border-gray-200 border-r-0 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={`w-12 ${sizeClasses[size]} text-center border-t border-b border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 disabled:bg-gray-100 font-light`}
      />
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || Number(value) >= max}
        className={`flex items-center justify-center w-8 ${sizeClasses[size]} border border-gray-200 border-l-0 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};