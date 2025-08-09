import { useState } from 'react';
import {CatalogList} from '../../features/catalog/ui/CatalogList/CatalogList';
import { Filter } from '../../features/catalog/ui/Filter/Filter';
import { Modal } from '../../shared/ui/Modal/Modal';
import { AddProductForm } from '../../features/catalog/ui/AdminFunctions/AddProductForm';
import { AdminGuard } from '../../features/auth/ui/AdminGuard';

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
          
          {/* ОБНОВЛЕННАЯ админская кнопка */}
          <AdminGuard>
            <div className="w-full flex justify-center md:justify-end mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300"
              >
                Добавить товар
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