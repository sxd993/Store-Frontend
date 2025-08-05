import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Пример данных товаров
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      category: 'pro',
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
      category: 'regular',
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
      category: 'pro',
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
      category: 'regular',
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
      category: 'regular',
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
      category: 'pro',
      image: '/iphone15promax.jpg',
      storage: '256GB',
      color: 'Natural Titanium',
      rating: 4.9,
      reviews: 2341
    }
  ];

  const categories = [
    { id: 'all', name: 'Все модели' },
    { id: 'pro', name: 'Pro модели' },
    { id: 'regular', name: 'Обычные модели' }
  ];

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
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
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
        {/* Фильтры и поиск */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            {/* Категории */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

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

        {/* Сетка товаров */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
  );
};

export default Catalog; 