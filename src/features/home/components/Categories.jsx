import { Link } from 'react-router-dom';
import { categories } from '../../../shared/utils/data';

const Categories = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Категории
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Выберите нужную категорию и найдите идеальный iPhone или аксессуары для него
          </p>
        </div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="group block"
            >
              <div className="bg-white border border-gray-200 hover:border-gray-300 p-6 text-center transition-colors duration-300 h-full flex flex-col">
                <div className="mb-6 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                </div>
                <h3 className="font-light text-lg md:text-xl text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-light">{category.count}</p>
                <div className="flex items-center justify-center gap-2 mt-auto">
                  <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 font-light">
                    Подробнее
                  </span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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