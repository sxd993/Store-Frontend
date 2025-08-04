import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/data';

const Categories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Категории товаров</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите нужную категорию и найдите идеальный iPhone или аксессуары для него
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="group block"
            >
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Icon */}
                <div className="text-4xl mb-3">{category.icon}</div>
                
                {/* Content */}
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count}</p>
                
                {/* Arrow */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-600 text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 