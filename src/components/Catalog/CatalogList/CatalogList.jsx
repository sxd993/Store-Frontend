import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CatalogApi } from '../../../api/Catalog/CatalogApi';
import { EditItem } from '../AdminFunctions/EditItem.jsx';
import { Modal } from '../../../ui/Modal/Modal.jsx';
import { ProductsGrid } from './ProductsGrid.jsx';
import { Pagination } from './Pagination.jsx';

export const CatalogList = ({ filters = {} }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const perPage = 12;

  // Сбрасываем страницу при смене фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Скролл в начало при смене страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Запрос данных каталога
  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog', currentPage, filters],
    queryFn: () => CatalogApi({ page: currentPage, per_page: perPage, filters }),
    staleTime: 1000 * 60 * 5
  });

  // Функция открытия модалки с выбранным товаром
  const handleEditClick = (product) => {
    setSelectedItem(product);
    setIsModalOpen(true);
  };

  // Функция закрытия модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Обработчик изменения страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Состояния загрузки
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 font-light">Загрузка товаров...</p>
      </div>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600 font-light mb-4">Ошибка загрузки товаров</p>
        <p className="text-sm text-gray-500 font-light">{error.message}</p>
      </div>
    );
  }

  // Пустое состояние
  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-light text-gray-900">Товары не найдены</h3>
        <p className="mt-2 text-gray-500 font-light">Попробуйте изменить параметры поиска</p>
      </div>
    );
  }

  return (
    <>
      {/* Сетка товаров */}
      <ProductsGrid
        products={data.items}
        onEditClick={handleEditClick}
      />

      {/* Пагинация */}
      <Pagination
        currentPage={currentPage}
        totalPages={data.pagination?.pages || 1}
        onPageChange={handlePageChange}
      />

      {/* Модальное окно */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedItem && (
          <EditItem
            item={selectedItem}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </>
  );
};