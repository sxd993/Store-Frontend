import { Link } from 'react-router-dom';

// Конфигурация категорий с фильтрами
const CATEGORIES_CONFIG = [
  {
    id: 'phones',
    name: 'Телефоны',
    description: 'iPhone, Samsung, Google',
    count: '24 товара',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&auto=format',
    filterParams: { category: 'телефон' },
    icon: (
      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'headphones',
    name: 'Наушники',
    description: 'AirPods, Sony, Bose',
    count: '18 товаров',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&auto=format',
    filterParams: { category: 'наушники' },
    icon: (
      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    )
  },
  {
    id: 'laptops',
    name: 'Ноутбуки',
    description: 'MacBook, Dell, Lenovo',
    count: '32 товара',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&auto=format',
    filterParams: { category: 'ноутбук' },
    icon: (
      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'watches',
    name: 'Часы',
    description: 'Apple Watch, Samsung',
    count: '12 товаров',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&auto=format',
    filterParams: { category: 'часы' },
    icon: (
      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// Утилита для создания URL с фильтрами
const createCatalogUrl = (filterParams) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(filterParams).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });
  
  return `/catalog?${searchParams.toString()}`;
};

// Компонент отдельной категории
const CategoryCard = ({ category }) => {
  const catalogUrl = createCatalogUrl(category.filterParams);
  
  return (
    <Link to={catalogUrl} className="group block h-full">
      <div className="bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-300 h-full flex flex-col overflow-hidden">
        {/* Изображение */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-colors duration-300"
            loading="lazy"
          />
        </div>
        
        {/* Контент */}
        <div className="p-6 flex flex-col flex-1 text-center">
          {/* Иконка и название */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex-shrink-0 group-hover:text-gray-900 transition-colors duration-300">
              {category.icon}
            </div>
            <h3 className="font-light text-xl text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
              {category.name}
            </h3>
          </div>
          

          
          {/* CTA */}
          <div className="mt-auto">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 group-hover:text-gray-700 transition-colors w-full">
              <span>Перейти</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Основной компонент Categories
const Categories = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Категории товаров
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Выберите категорию и найдите идеальную технику для ваших потребностей
          </p>
        </div>

        {/* Сетка категорий - 4 столбца */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {CATEGORIES_CONFIG.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;