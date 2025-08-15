import { memo, useCallback } from 'react';
import { ProductCard } from './CatalogProductCard';

// ОПТИМИЗИРОВАННАЯ ВЕРСИЯ ProductsGrid
export const ProductsGrid = memo(({ products = [], onEditClick }) => {
  
  // Мемоизируем обработчик редактирования
  const handleEditClick = useCallback((product) => {
    if (onEditClick) {
      onEditClick(product);
    }
  }, [onEditClick]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEditClick={handleEditClick}
        />
      ))}
    </div>
  );
});