import React from 'react';
import { brands } from '../../utils/data';

const Brands = () => {
  const featuredBrands = brands.filter(brand => brand.featured);
  const allBrands = brands;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Популярные бренды</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Работаем только с проверенными производителями аксессуаров
          </p>
        </div>

        {/* Featured Brands */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Премиум партнеры</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featuredBrands.map((brand, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-blue-50 transition-all duration-300 hover:shadow-lg cursor-pointer">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {brand.logo}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Brands */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">Все бренды</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {allBrands.map((brand, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {brand.logo}
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands; 