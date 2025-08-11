import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../shared/utils/formatPrice';

export const ProductCard = memo(({ product }) => {
  // Мемоизируем вычисляемые значения
  const formattedPrice = useMemo(() => 
    formatPrice(product.price), 
    [product.price]
  );

  const productLink = useMemo(() => 
    `/product/${product.id}`, 
    [product.id]
  );

  const displayName = useMemo(() => 
    product.model || product.name, 
    [product.model, product.name]
  );

  return (
    <div className="group h-full">
      <Link
        to={productLink}
        className="block h-full"
      >
        <div className="bg-white border border-gray-200 overflow-hidden h-full flex flex-col hover:border-gray-300 transition-colors duration-300 text-center">
          {/* Изображение товара */}
          <div className="h-80 flex flex-col items-center justify-center flex-shrink-0 pt-3">
            {product.image && (
              <img
                src={product.image}
                alt={displayName}
                className="w-full h-full object-contain p-3"
                loading="lazy"
              />
            )}
          </div>

          {/* Информация о товаре */}
          <div className="p-4 flex flex-col flex-1 items-center justify-center">
            <h3 className="font-medium text-base text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2 text-center">
              {displayName}
            </h3>
            
            {/* Характеристики */}
            <div className="space-y-1 mb-3 text-xs text-gray-600 flex-1 text-center">
              {product.color && (
                <p className="text-center">
                  <span className="font-medium">Цвет:</span> {product.color}
                </p>
              )}
              {product.memory && (
                <p className="text-center">
                  <span className="font-medium">Память:</span> {product.memory} ГБ
                </p>
              )}
            </div>
            
            {/* Цена */}
            <div className="flex items-center justify-center pt-3 border-t border-gray-100 text-xl font-light text-gray-900 mt-auto w-full">
              <p className="text-center">
                {formattedPrice}
              </p>
            </div>
            
            {/* Ссылка "Подробнее" */}
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500 group-hover:text-gray-700 transition-colors w-full">
              <span>Подробнее</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});