import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/data';

const Categories = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">Категории</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Выберите нужную категорию и найдите идеальный iPhone или аксессуары для него
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.path}
            className="group block"
          >
            <div className="bg-white border-2 border-gray-200 hover:border-gray-300 p-6 md:p-10 text-center transition-colors duration-300">
              <div className="mb-6 md:mb-8 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 md:w-28 md:h-28 object-contain bg-gray-50 border border-gray-200"
                />
              </div>
              <h3 className="font-medium text-xl md:text-2xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm md:text-base text-gray-500 mb-4">{category.count}</p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">Подробнее</span>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Categories;