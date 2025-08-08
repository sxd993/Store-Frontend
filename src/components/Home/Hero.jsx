import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductApi } from '../../api/Catalog/CatalogApi';

const Hero = () => {
  // ID товара указывается прямо здесь
  const productId = 57;

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => ProductApi(productId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!productId
  });

  if (isLoading) {
    return (
      <section className="py-24 md:py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-20 max-w-7xl mx-auto">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-xl md:max-w-2xl h-[500px] bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="h-12 bg-gray-200 animate-pulse rounded mb-8 w-full max-w-md"></div>
              <div className="h-8 bg-gray-200 animate-pulse rounded mb-8 w-full max-w-lg"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded mb-12 w-full max-w-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <section className="py-24 md:py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-20 max-w-7xl mx-auto">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xl md:max-w-2xl overflow-hidden flex items-center justify-center">
              <img
                alt={`${product.brand} ${product.model}`}
                src={product.image}
                className="object-contain w-full h-auto max-h-[500px] md:max-h-[600px]"
                onError={(e) => {
                  console.log('Image failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
              {product.brand} {product.model}
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
              {product.description || `${product.brand} ${product.model} - инновационные технологии в ваших руках`}
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl leading-relaxed">
              {product.longDescription || `Откройте для себя новую эру ${product.brand} с революционным дизайном и мощными возможностями.`}
            </p>
            <div className="flex gap-6 items-center">
              <button className="px-10 py-4 md:px-12 md:py-5 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-lg">
                Купить
              </button>
              <Link
                to={`/product/${product.id}`}
                className="px-10 py-4 md:px-12 md:py-5 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 text-lg"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;