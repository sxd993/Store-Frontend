import { ProductCard } from '../../components/Home/ProductCard';
import { usePopularProducts } from '../../hooks/PopularOffers/usePopularProducts';

export const PopularOffers = ({ ids }) => {
    const { 
      data: products = [], 
      isLoading, 
      error, 
      refetch 
    } = usePopularProducts(ids);
  
    if (isLoading) {
      return <p> Загрузка...</p>;
    }
  
    if (error) {
      return <p> Загрузка не удалась</p>;
    }
  
    if (!products.length) {
      return null;
    }
  
    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Популярные предложения
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Самые востребованные товары, которые выбирают наши покупатели
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {products.slice(0, 3).map(product => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  