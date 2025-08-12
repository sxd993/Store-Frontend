import { BestOffersProductCard } from './BestOffersProductCard';
import { useBestOffers } from '../hooks/useBestOffers';

export const BestOffers = () => {
  const { bestOfferIds, products, isLoading, handleProductChange } = useBestOffers();

  if (isLoading) {
    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Лучшие предложения
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border border-gray-200 p-6 animate-pulse">
                <div className="bg-gray-200 h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 mb-2"></div>
                <div className="bg-gray-200 h-4 mb-4 w-2/3"></div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {bestOfferIds.map((productId, index) => (
            <BestOffersProductCard
              key={`${productId}-${index}`}
              product={products[index]}
              index={index}
              onProductChange={handleProductChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
};