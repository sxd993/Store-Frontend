import { memo, useCallback } from 'react';
import { ProductCard } from './ProductCard';

// ОПТИМИЗИРОВАННАЯ ВЕРСИЯ ProductsGrid
export const ProductsGrid = memo(({ products, onEditClick }) => {
  
  // Мемоизируем обработчик редактирования
  const handleEditClick = useCallback((product) => {
    onEditClick(product);
  }, [onEditClick]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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