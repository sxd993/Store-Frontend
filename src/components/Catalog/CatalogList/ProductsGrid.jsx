import { ProductCard } from './ProductCard';
import { useAuth } from '../../../hooks/Auth/useAuth';

export const ProductsGrid = ({ products, onEditClick }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  console.log(JSON.stringify(user));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEditClick={onEditClick}
          user={user}
        />
      ))}
    </div>
  );
};
