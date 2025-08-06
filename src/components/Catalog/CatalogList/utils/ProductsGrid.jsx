import { ProductCard } from './ProductCard';

export const ProductsGrid = ({ products, onEditClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
};