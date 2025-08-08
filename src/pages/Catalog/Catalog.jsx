import { useState } from 'react';
import { CatalogList } from '../../components/Catalog/CatalogList/CatalogList';
import { Filter } from '../../components/Catalog/Filter/Filter';
import { Modal } from '../../ui/Modal/Modal';
import { AddProductForm } from '../../components/Catalog/AdminFunctions/AddProductForm';
import { useAuth } from '../../hooks/Auth/useAuth';

const Catalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

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
          {/* Кнопка добавления товара */}
          {
            user?.is_admin === 1 
              ?
              <div className="w-full flex justify-center md:justify-end mb-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300"
                >
                  Добавить товар
                </button>
              </div>
              :
              <></>
          }
          {/*     Фильтры    */}
          <Filter />
          <CatalogList />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProductForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
};

export default Catalog; 