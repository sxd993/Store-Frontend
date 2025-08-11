import { ProductCard } from './ProductCard.jsx';
import { useBestOffers } from '../../features/catalog/hooks/useBestOffers';

export const BestOffers = ({ ids }) => {
    const { 
      data: products = [], 
      isLoading, 
      error, 
      refetch 
    } = useBestOffers(ids);
  
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3].map((item) => (
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
  
    if (error) {
      return (
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
                Лучшие предложения
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Самые качественные товары с лучшими ценами и характеристиками
              </p>
              <div className="flex items-center justify-center mb-8">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-base text-gray-600 font-light">Загрузка не удалась</p>
            </div>
          </div>
        </section>
      );
    }
  
    if (!products.length) {
      return null;
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
  