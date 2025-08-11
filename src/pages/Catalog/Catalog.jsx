import { useState } from 'react';
import {CatalogList} from '../../features/catalog/components/CatalogList/CatalogList';
import { Filter } from '../../features/catalog/components/Filter/Filter';
import { Modal } from '../../shared/components/Modal';
import { AddProductForm } from '../../features/catalog/components/AddProductForm';
import { AdminGuard } from '../../features/auth/components/AdminGuard';

const Catalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  const handleFiltersApply = async (filters) => {
    setCurrentFilters(filters);
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Список товаров на всю ширину */}
        <div className="w-full">
          {/* Заголовок */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-8">
              Каталог товаров
            </h1>
          </div>
          
          {/* Админская кнопка */}
          <AdminGuard>
            <div className="w-full flex justify-center md:justify-end mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors duration-300 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm font-light text-gray-900">Добавить товар</span>
                  </div>
                </div>
              </button>
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

export default Catalog;