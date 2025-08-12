import { useQuery } from '@tanstack/react-query';
import { useBestOffersLocal } from '../hooks/useBestOffersLocal';
import { BestOffersProductCard } from './BestOffersProductCard';
import { ProductApi } from '../../product/api/ProductApi';
import { useAuth } from '../../auth/hooks/useAuth';
import { useCallback } from 'react';

export const BestOffers = () => {
  const { isAdmin } = useAuth();
  const { bestOfferIds, updateProductAtIndex, canManage } = useBestOffersLocal();

  // Получаем данные товаров по ID
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['bestOffers', bestOfferIds],
    queryFn: async () => {
      const productPromises = bestOfferIds.map(async (id) => {
        try {
          return await ProductApi(id);
        } catch (error) {
          console.warn(`Товар с ID ${id} не найден`);
          return null;
        }
      });
      return Promise.all(productPromises);
    },
    staleTime: 1000 * 60 * 5,
    enabled: bestOfferIds.length > 0
  });

  const handleProductChange = useCallback((index, newProductId) => {
    updateProductAtIndex(index, newProductId);
  }, [updateProductAtIndex]);

  if (isLoading) {
    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Лучшие предложения
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Самые качественные товары с лучшими ценами и характеристиками
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border border-gray-200 p-6 animate-pulse">
                <div className="bg-gray-200 h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 mb-2"></div>
                <div className="bg-gray-200 h-4 mb-4 w-2/3"></div>
                <div className="bg-gray-200 h-6 mb-4 w-1/3"></div>
                <div className="bg-gray-200 h-12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Лучшие предложения
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Самые качественные товары с лучшими ценами и характеристиками
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {bestOfferIds.map((productId, index) => {
            const product = products[index];

            return (
              <BestOffersProductCard
                key={`${productId}-${index}`}
                product={product}
                index={index}
                onProductChange={canManage ? handleProductChange : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};