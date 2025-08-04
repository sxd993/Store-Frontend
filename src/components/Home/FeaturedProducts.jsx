import React, { useState } from 'react';
import { featuredProducts } from '../../utils/data';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [sortBy, setSortBy] = useState('popular');

  const sortProducts = (products, sortType) => {
    switch (sortType) {
      case 'price-low':
        return [...products].sort((a, b) => parseInt(a.price) - parseInt(b.price));
      case 'price-high':
        return [...products].sort((a, b) => parseInt(b.price) - parseInt(a.price));
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'new':
        return [...products].sort((a, b) => b.isNew - a.isNew);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(featuredProducts, sortBy);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Популярные iPhone</h2>
            <p className="text-xl text-gray-600">
              Самые востребованные модели с лучшими ценами
            </p>
          </div>
          
          {/* Sort Controls */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <span className="text-gray-600">Сортировать:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">По популярности</option>
              <option value="price-low">По цене (дешевле)</option>
              <option value="price-high">По цене (дороже)</option>
              <option value="rating">По рейтингу</option>
              <option value="new">Сначала новые</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
            Смотреть все iPhone →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 