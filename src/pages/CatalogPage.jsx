import { useState, useCallback } from 'react';
import { CatalogContainer } from '../features/catalog/components/CatalogContainer';
import { FilterContainer } from '../features/catalog/components/FilterContainer';
import { Modal } from '../shared/ui/Modal';
import { AddProductContainer } from '../features/catalog/components/AddProductContainer';
import { AdminGuard } from '../shared/components/AdminGuard';
import { CATEGORY_DISPLAY_NAMES } from '../features/catalog/utils/CatalogPageConst';

export const CatalogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  // Мемоизированный обработчик изменения фильтров из FilterContainer
  const handleFiltersChange = useCallback((filters) => {
    setCurrentFilters(filters);
  }, []);

  // Определяем заголовок страницы на основе активных фильтров
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
          </div>

          {/* Фильтры и активные фильтры - полностью управляются контейнером */}
          <FilterContainer onFiltersChange={handleFiltersChange} />

          {/* Каталог - используем контейнер */}
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