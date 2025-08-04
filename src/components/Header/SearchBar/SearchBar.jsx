import React from 'react';

const SearchBar = ({ className = '', placeholder = "Поиск iPhone, чехлов, аксессуаров..." }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-6 py-4 pl-14 pr-32 border-2 border-gray-200 focus:outline-none focus:border-gray-400 bg-white text-gray-900 font-light transition-colors duration-300"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-6 py-2 font-medium hover:bg-gray-700 transition-colors duration-300">
        Найти
      </button>
    </div>
  );
};

export default SearchBar; 