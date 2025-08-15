import { memo } from 'react';
import { ProductsGrid } from './CatalogGrid';
import { Pagination } from '../../../../shared/components/Pagination';
import { Modal } from '../../../../shared/ui/Modal';
import { EditProductContainer } from '../../components/EditProductContainer';
import { NotificationAlert } from '../../../../shared/ui/SuccessAlert';
import { LoadingState, ErrorState, EmptyState } from './states/CatalogListStates';

export const CatalogList = memo(({
  products = [],
  pagination = {},
  isLoading = false,
  error = null,
  currentPage = 1,
  onPageChange,
  selectedItem,
  isModalOpen,
  onEditClick,
  onCloseModal
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {/* Сетка товаров */}
      <ProductsGrid
        products={products}
        onEditClick={onEditClick}
      />

      {/* Пагинация */}
      <Pagination
        currentPage={currentPage}
        totalPages={pagination?.pages || 1}
        onPageChange={onPageChange}
      />

      {/* Модальное окно */}
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        {selectedItem && (
          <EditProductContainer
            item={selectedItem}
            onClose={onCloseModal}
          />
        )}
      </Modal>

      <NotificationAlert />
    </>
  );
});