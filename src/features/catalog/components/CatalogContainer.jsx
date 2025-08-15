import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CatalogApi } from '../api/catalog';
import { CatalogList } from '../ui/Catalog/CatalogList';

export const CatalogContainer = ({ filters = {} }) => {
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

  // Мемоизируем все обработчики для предотвращения ненужных рендеров
  const handleEditClick = useCallback((product) => {
    setSelectedItem(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <CatalogList
      products={data?.items || []}
      pagination={data?.pagination || {}}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      selectedItem={selectedItem}
      isModalOpen={isModalOpen}
      onEditClick={handleEditClick}
      onCloseModal={handleCloseModal}
    />
  );
};