import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CatalogList } from '../components/CatalogList/CatalogList';
import { Filter } from '../components/Filter/Filter';
import { Modal } from '../../../shared/ui/Modal';
import { AddProductForm } from '../components/CatalogList/AddProductForm';
import { AdminGuard } from '../../auth/components/AdminGuard';

// Маппинг категорий для отображения пользователю
const CATEGORY_DISPLAY_NAMES = {
  'телефон': 'Телефоны',
  'наушники': 'Наушники', 
  'ноутбук': 'Ноутбуки',
  'часы': 'Часы'
};

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  // Инициализация фильтров из URL при загрузке
  useEffect(() => {
    const urlFilters = {};
    
    // Извлекаем все параметры из URL
    for (const [key, value] of searchParams.entries()) {
      if (value && value !== 'all') {
        urlFilters[key] = value;
      }
    }
    
    setCurrentFilters(urlFilters);
  }, [searchParams]);

  const handleFiltersApply = async (filters) => {
    setCurrentFilters(filters);
    
    // Обновляем URL при применении фильтров
    const newSearchParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'Все категории' && value !== 'Все бренды') {
        newSearchParams.set(key, value);
      }
    });
    
    // Обновляем URL без перезагрузки страницы
    setSearchParams(newSearchParams, { replace: true });
  };

  // Определяем заголовок страницы на основе активных фильтров
  const getPageTitle = () => {
    const activeCategory = currentFilters.category;
    
    if (activeCategory && CATEGORY_DISPLAY_NAMES[activeCategory]) {
      return CATEGORY_DISPLAY_NAMES[activeCategory];
    }
    
    return 'Каталог товаров';
  };

  // Определяем подзаголовок
  const getPageSubtitle = () => {
    const activeCategory = currentFilters.category;
    
    if (activeCategory && CATEGORY_DISPLAY_NAMES[activeCategory]) {
      return `Все товары в категории "${CATEGORY_DISPLAY_NAMES[activeCategory]}"`;
    }
    
    return 'Найдите идеальную технику для ваших потребностей';
  };

  // Хлебные крошки для навигации
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Главная', href: '/' }];
    
    const activeCategory = currentFilters.category;
    if (activeCategory && CATEGORY_DISPLAY_NAMES[activeCategory]) {
      breadcrumbs.push({ 
        name: CATEGORY_DISPLAY_NAMES[activeCategory], 
        href: `/catalog?category=${activeCategory}` 
      });
    } else {
      breadcrumbs.push({ name: 'Каталог', href: '/catalog' });
    }
    
    return breadcrumbs;
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="w-full">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              {getPageTitle()}
            </h1>
            
            {/* Активные фильтры */}
            {Object.keys(currentFilters).length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm text-gray-600 font-light">Активные фильтры:</span>
                {Object.entries(currentFilters).map(([key, value]) => (
                  <span 
                    key={`${key}-${value}`}
                    className="inline-flex items-center py-1 rounded-lg text-sm font-light bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span className="mr-1 ml-2">
                      {key === 'category' && CATEGORY_DISPLAY_NAMES[value] ? CATEGORY_DISPLAY_NAMES[value] : value}
                    </span>
                    <button
                      onClick={() => {
                        const newFilters = { ...currentFilters };
                        delete newFilters[key];
                        handleFiltersApply(newFilters);
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {Object.keys(currentFilters).length > 1 && (
                  <button
                    onClick={() => handleFiltersApply({})}
                    className="px-4 py-2 text-sm font-light text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-colors duration-300"
                  >
                    Очистить все
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Админская кнопка */}
          <AdminGuard>
            <div className="w-full mb-6">
              {/* Десктопная версия */}
              <div className="hidden md:flex justify-end">
                <div className="w-full md:max-w-xs">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-300 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-sm font-light text-gray-900">Добавить товар</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Мобильная версия */}
              <div className="flex md:hidden justify-center">
                <div className="w-full max-w-sm">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-300 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-sm font-light text-gray-900">Добавить товар</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </AdminGuard>

          {/* Фильтры */}
          <Filter onFiltersApply={handleFiltersApply} />

          {/* Каталог */}
          <CatalogList filters={currentFilters} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProductForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
};