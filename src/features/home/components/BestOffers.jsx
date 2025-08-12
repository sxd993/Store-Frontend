import { BestOffersProductCard } from './BestOffersProductCard';
import { useBestOffers } from '../hooks/useBestOffers';

export const BestOffers = () => {
  const { products, configuredIds, isLoading, updateSingleOffer, isUpdating } = useBestOffers();

  if (isLoading) {
    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4 text-center">
            Лучшие предложения
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12 text-center">
            Откройте для себя эксклюзивные предложения на лучшую технику
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map(item => (
              <div key={item} className="bg-white border border-gray-200 p-6 animate-pulse">
                <div className="bg-gray-200 h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 mb-2"></div>
                <div className="bg-gray-200 h-4 w-2/3"></div>
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
        <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4 text-center">
          Лучшие предложения
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12 text-center">
          Откройте для себя эксклюзивные предложения на лучшую технику
        </p>

        {/* Товары с индивидуальными кнопками */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <BestOffersProductCard 
              key={index} 
              product={product} 
              index={index}
              configuredId={configuredIds[index]}
              onUpdateId={updateSingleOffer}
              isUpdating={isUpdating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};