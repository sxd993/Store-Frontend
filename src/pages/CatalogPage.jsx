import { useState, useCallback } from 'react';
import { Modal } from '../shared/ui/Modal';
import { AdminGuard } from '../shared/components/AdminGuard';

import { CatalogContainer } from '../features/catalog/components/CatalogContainer';
import { FiltersContainer } from '../features/catalog/components/FiltersContainer';
import { AddProductContainer } from '../features/catalog/components/AdminFeatures/AddProductContainer';
import { AddProductButton } from '../features/catalog/ui/Catalog/AddProductButton'

import { CATEGORY_DISPLAY_NAMES } from '../features/catalog/utils/CatalogPageConst';

export const CatalogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  const handleFiltersChange = useCallback((filters) => {
    setCurrentFilters(filters);
  }, []);

  const getPageTitle = () => {
    const activeCategory = currentFilters.category;

    if (activeCategory && CATEGORY_DISPLAY_NAMES[activeCategory]) {
      return CATEGORY_DISPLAY_NAMES[activeCategory];
    }

    return 'Каталог товаров';
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="w-full">
          {/* Админская кнопка над заголовком */}
          <AdminGuard>
            <AddProductButton onClick={() => setIsModalOpen(true)} />
          </AdminGuard>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Фильтры */}
          <FiltersContainer onFiltersChange={handleFiltersChange} />

          {/* Каталог  */}
          <CatalogContainer filters={currentFilters} />
        </div>
      </div>

      {/* Модальное окно для добавления товара */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddProductContainer onClose={handleCloseModal} />
      </Modal>
    </section>
  );
};