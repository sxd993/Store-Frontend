import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedStorage, setSelectedStorage] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  // Полный список моделей iPhone
  const allModels = [
    'iPhone 12',
    'iPhone 12 Pro',
    'iPhone 12 Pro Max',
    'iPhone 12 mini',
    'iPhone 13',
    'iPhone 13 Pro',
    'iPhone 13 Pro Max',
    'iPhone 13 mini',
    'iPhone 14',
    'iPhone 14 Pro',
    'iPhone 14 Pro Max',
    'iPhone 14 Plus',
    'iPhone 15',
    'iPhone 15 Pro',
    'iPhone 15 Pro Max',
    'iPhone 15 Plus',
    'iPhone 16',
    'iPhone 16 Pro',
    'iPhone 16 Pro Max',
    'iPhone 16 Plus',
    'iPhone 16e'
  ];

  // Пример данных товаров
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      model: 'iPhone 15 Pro',
      image: '/iphone15pro.jpg',
      storage: '128GB',
      color: 'Natural Titanium',
      rating: 4.8,
      reviews: 1247
    },
    {
      id: 2,
      name: 'iPhone 15',
      price: 799,
      model: 'iPhone 15',
      image: '/iphone15.jpg',
      storage: '128GB',
      color: 'Black',
      rating: 4.6,
      reviews: 892
    },
    {
      id: 3,
      name: 'iPhone 14 Pro',
      price: 899,
      model: 'iPhone 14 Pro',
      image: '/iphone14pro.jpg',
      storage: '256GB',
      color: 'Deep Purple',
      rating: 4.7,
      reviews: 1563
    },
    {
      id: 4,
      name: 'iPhone 14',
      price: 699,
      model: 'iPhone 14',
      image: '/iphone14.jpg',
      storage: '128GB',
      color: 'Blue',
      rating: 4.5,
      reviews: 743
    },
    {
      id: 5,
      name: 'iPhone 13',
      price: 599,
      model: 'iPhone 13',
      image: '/iphone13.jpg',
      storage: '128GB',
      color: 'Pink',
      rating: 4.4,
      reviews: 621
    },
    {
      id: 6,
      name: 'iPhone 15 Pro Max',
      price: 1199,
      model: 'iPhone 15 Pro Max',
      image: '/iphone15promax.jpg',
      storage: '256GB',
      color: 'Natural Titanium',
      rating: 4.9,
      reviews: 2341
    },
    {
      id: 7,
      name: 'iPhone 15 Pro Max',
      price: 1299,
      model: 'iPhone 15 Pro Max',
      image: '/iphone15promax.jpg',
      storage: '512GB',
      color: 'Natural Titanium',
      rating: 4.9,
      reviews: 1892
    },
    {
      id: 8,
      name: 'iPhone 15 Pro',
      price: 1099,
      model: 'iPhone 15 Pro',
      image: '/iphone15pro.jpg',
      storage: '256GB',
      color: 'Blue Titanium',
      rating: 4.8,
      reviews: 1567
    },
    {
      id: 9,
      name: 'iPhone 15',
      price: 899,
      model: 'iPhone 15',
      image: '/iphone15.jpg',
      storage: '256GB',
      color: 'Pink',
      rating: 4.6,
      reviews: 1023
    },
    {
      id: 10,
      name: 'iPhone 14 Pro Max',
      price: 1099,
      model: 'iPhone 14 Pro Max',
      image: '/iphone14promax.jpg',
      storage: '256GB',
      color: 'Deep Purple',
      rating: 4.8,
      reviews: 1876
    },
    {
      id: 11,
      name: 'iPhone 14 Plus',
      price: 899,
      model: 'iPhone 14 Plus',
      image: '/iphone14plus.jpg',
      storage: '128GB',
      color: 'Purple',
      rating: 4.6,
      reviews: 945
    },
    {
      id: 12,
      name: 'iPhone 13 Pro',
      price: 999,
      model: 'iPhone 13 Pro',
      image: '/iphone13pro.jpg',
      storage: '256GB',
      color: 'Sierra Blue',
      rating: 4.7,
      reviews: 1234
    }
  ];

  // Получаем уникальные значения для фильтров
  const colors = [...new Set(products.map(product => product.color))];
  const storages = [...new Set(products.map(product => product.storage))];

  const sortOptions = [
    { value: 'name', label: 'По названию' },
    { value: 'price-low', label: 'Цена: по возрастанию' },
    { value: 'price-high', label: 'Цена: по убыванию' },
    { value: 'rating', label: 'По рейтингу' }
  ];

  // Фильтрация и сортировка
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesModel = selectedModel === 'all' || product.model === selectedModel;
      const matchesColor = selectedColor === 'all' || product.color === selectedColor;
      const matchesStorage = selectedStorage === 'all' || product.storage === selectedStorage;
      return matchesSearch && matchesModel && matchesColor && matchesStorage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Сброс всех фильтров
  const resetFilters = () => {
    setSelectedModel('all');
    setSelectedColor('all');
    setSelectedStorage('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Заголовок */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            Каталог iPhone
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Выберите идеальный iPhone для себя. От классических моделей до профессиональных Pro версий.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Поиск и сортировка */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Поиск */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Поиск iPhone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
              />
            </div>

            {/* Сортировка */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Количество товаров */}
            <div className="flex items-center justify-center px-4 py-4 border border-gray-200">
              <span className="text-sm text-gray-600 font-light">
                {filteredProducts.length} товаров
              </span>
            </div>
          </div>
        </div>

        {/* Основной контент с фильтрами */}
        <div className="flex gap-8">
          {/* Боковые фильтры */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Фильтры</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 font-light underline"
                >
                  Сбросить
                </button>
              </div>

              {/* Фильтр по модели */}
              <div className="mb-8">
                <div className="relative">
                  <button
                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 bg-white text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-300"
                  >
                    <span>{selectedModel === 'all' ? 'Все модели' : selectedModel}</span>
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isModelDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isModelDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setSelectedModel('all');
                            setIsModelDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                            selectedModel === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          Все модели
                        </button>
                        {allModels.map(model => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setIsModelDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                              selectedModel === model ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            }`}
                          >
                            {model}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Фильтр по цвету */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Цвет</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="color"
                      value="all"
                      checked={selectedColor === 'all'}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-light">Все цвета</span>
                  </label>
                  {colors.map(color => (
                    <label key={color} className="flex items-center">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={selectedColor === color}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span className="ml-3 text-sm text-gray-700 font-light">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Фильтр по памяти */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Память</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="storage"
                      value="all"
                      checked={selectedStorage === 'all'}
                      onChange={(e) => setSelectedStorage(e.target.value)}
                      className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-light">Любая память</span>
                  </label>
                  {storages.map(storage => (
                    <label key={storage} className="flex items-center">
                      <input
                        type="radio"
                        name="storage"
                        value={storage}
                        checked={selectedStorage === storage}
                        onChange={(e) => setSelectedStorage(e.target.value)}
                        className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span className="ml-3 text-sm text-gray-700 font-light">{storage}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Кнопка сброса фильтров */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={resetFilters}
                  className="w-full border-2 border-gray-200 bg-white text-gray-700 px-6 py-3 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors duration-300"
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </div>

          {/* Сетка товаров */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  {/* Изображение товара */}
                  <div className="aspect-square bg-gray-50 mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-300">
                    <svg className="h-20 w-20 text-gray-300 group-hover:text-gray-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>

                  {/* Информация о товаре */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-light text-gray-900">{product.name}</h3>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 font-light">{product.storage} • {product.color}</p>
                      
                      {/* Рейтинг */}
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-gray-900' : 'text-gray-200'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500 font-light">({product.reviews})</span>
                      </div>
                    </div>

                    {/* Цена и кнопки */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-light text-gray-900">${product.price}</p>
                        <p className="text-sm text-gray-500 font-light">или $99/мес</p>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Здесь будет логика добавления в корзину
                            console.log('Добавить в корзину:', product.name);
                          }}
                          className="flex-1 border-2 border-gray-900 bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
                        >
                          В корзину
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `/product/${product.id}`;
                          }}
                          className="flex-1 border-2 border-gray-200 bg-gray-50 text-gray-700 px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-300"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Пустое состояние */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-light text-gray-900">Товары не найдены</h3>
                <p className="mt-2 text-gray-500 font-light">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog; 