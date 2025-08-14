import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CatalogList } from '../features/catalog/components/Catalog/CatalogList/CatalogList';
import { Filter } from '../features/catalog/components/Catalog/Filter/Filter';
import { Modal } from '../shared/ui/Modal';
import { AddProductForm } from '../components/CatalogList/AddProductForm';
import { AdminGuard } from '../features/auth/components/shared/AdminGuard';

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
          {/* Админская кнопка над заголовком */}
          <AdminGuard>
            <div className="w-full mb-6">
              <div className="flex justify-center">
                <div className="w-full max-w-[150px]">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-center rounded-2xl py-2.5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-light">Добавить товар</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </AdminGuard>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
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