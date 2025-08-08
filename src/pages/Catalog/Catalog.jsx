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
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">


        {/*     Фильтры    */}
        <Filter />

        {/* Список товаров на всю ширину */}
        <div className="w-full">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Каталог товаров
            </h1>
          </div>

          {/* Кнопка добавления товара */}
          {
            user?.isAdmin
              ?
              <div className="w-full flex justify-center md:justify-end mb-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
                >
                  Добавить товар
                </button>
              </div>
              :
              <></>
          }

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