import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../api/SearchApi';
import { formatPrice } from '../utils/formatPrice';

const Search = ({ className = "" }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Поиск с дебаунсом
  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchProducts(query),
    enabled: query.length >= 2,
    staleTime: 30000
  });

  // Закрытие при клике вне области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length >= 2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Фокусируем инпут и показываем результаты
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  const highlightText = (text, searchQuery) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ?
        <mark key={index} className="bg-yellow-200 text-gray-900">{part}</mark> :
        part
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className={`flex items-center border border-gray-600 bg-white overflow-hidden ${className.includes('rounded') ? className : 'rounded-2xl'}`}>
        {/* Кнопка каталога */}
        <Link
          to="/catalog"
          className="flex items-center gap-2 px-6 py-2 text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
        >
          <span className="tracking-wide text-base">Каталог</span>
        </Link>

        {/* Разделитель */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* Поиск */}
        <div className="flex-1 flex items-center px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск товаров..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            className="outline-none bg-transparent text-sm text-black placeholder-gray-500 w-full font-light"
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="p-1 text-gray-600 ml-2 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </form>

      {/* Выпадающий список результатов */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 shadow-lg max-h-96 overflow-y-auto z-50 rounded-b-2xl">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
              Поиск...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Изображение */}
                  <div className="w-12 h-12 flex-shrink-0">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.model}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Информация */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {highlightText(`${product.brand} ${product.model}`, query)}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      {product.color && <span>{product.color}</span>}
                      {product.memory && <span>• {product.memory} ГБ</span>}
                    </div>
                  </div>

                  {/* Цена */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                    <div className="text-xs text-green-600">
                      В наличии
                    </div>
                  </div>
                </Link>
              ))}

              {/* Показать все результаты */}
              <div className="border-t border-gray-200 p-3">
                <button
                  onClick={() => {
                    console.log('Показать все результаты для:', query);
                    setIsOpen(false);
                  }}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Показать все результаты ({results.length})
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;