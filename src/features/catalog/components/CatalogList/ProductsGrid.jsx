import { memo, useCallback } from 'react';
import { ProductCard } from './ProductCard.jsx';

// ОПТИМИЗИРОВАННАЯ ВЕРСИЯ ProductsGrid
export const ProductsGrid = memo(({ products, onEditClick }) => {
  
  // Мемоизируем обработчик редактирования
  const handleEditClick = useCallback((product) => {
    onEditClick(product);
  }, [onEditClick]);

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