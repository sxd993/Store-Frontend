import { useState, useEffect, useRef } from 'react';

export const DropDownFilter = ({ 
  title, 
  options, 
  selectedValue, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (selectedValue === 'all') {
      return `Все ${title.toLowerCase()}`;
    }
    return selectedValue;
  };

  // Закрытие при клике вне области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-8">
      <h4 className="text-sm font-light text-gray-900 mb-4">{title}</h4>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 bg-white text-left text-sm font-light text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-300"
        >
          <span>{getDisplayValue()}</span>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              <button
                onClick={() => handleSelect('all')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-light transition-colors duration-300 ${
                  selectedValue === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                }`}
              >
                Все {title.toLowerCase()}
              </button>
              {options?.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-light transition-colors duration-300 ${
                    selectedValue === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};