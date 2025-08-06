import { useState } from 'react';
import { CatalogList } from '../../components/Catalog/CatalogList';
import { FilterSideBar } from '../../components/Catalog/Filter';
import { Modal } from '../../ui/Modal/Modal';
import { AddProductForm } from '../../components/Catalog/AddProudctForm';

const Catalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSideBar />
          
          <div className="flex-1">
            <div className="w-full flex justify-center md:justify-end mb-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex justify-center items-center text-nowrap bg-neutral-300 hover:bg-neutral-400 px-4 py-2 rounded-full transition-colors"
              >
                Добавить товар
              </button>
            </div>
            
            <CatalogList />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProductForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Catalog;