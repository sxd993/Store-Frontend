import { BestOffersProductCard } from './BestOffersProductCard';
import { useBestOffers } from '../../hooks/useBestOffers';

export const BestOffers = () => {
  const { products, configuredIds, isLoading, updateSingleOffer, isUpdating } = useBestOffers();

  if (isLoading) {
    return (
      <section className="py-10 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
            Лучшие предложения
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-14 text-center">
            Откройте для себя эксклюзивные предложения на лучшую технику
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map(item => (
              <div
                key={item}
                className="bg-white border border-gray-200 p-6 rounded-2xl   animate-pulse"
              >
                <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-15 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 text-center tracking-tight">
          Лучшие предложения
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-5 text-center">
          Откройте для себя эксклюзивные предложения на лучшую технику
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
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