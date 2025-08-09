import { Link } from 'react-router-dom';
import { formatPrice } from '../../shared/utils/formatPrice.jsx';

// Добавляем export
export const ProductCard = ({ product }) => {
  return (
    <div className="group h-full">
      <Link
        to={`/product/${product.id}`}
        className="block h-full"
      >
        <div className="bg-white border border-gray-200 overflow-hidden h-full flex flex-col">
          {/* Изображение товара */}
          <div className="aspect-square flex flex-col items-center justify-center flex-shrink-0">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : null} 
          </div>

          {/* Информация о товаре */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-medium text-lg text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
              {product.model}
            </h3>
            
            {/* Характеристики */}
            <div className="space-y-2 mb-4 text-sm text-gray-600 flex-1">
              {product.color && (
                <p>
                  <span className="font-medium">Цвет:</span> {product.color}
                </p>
              )}
              {product.memory && (
                <p>
                  <span className="font-medium">Память:</span> {product.memory} ГБ
                </p>
              )}
            </div>
            
            {/* Цена */}
            <div className="flex items-center justify-center pt-4 border-t border-gray-100 text-2xl font-light text-gray-900 mt-auto">
              <p className="text-center">
                {formatPrice(product.price)}
              </p>
            </div>
            
            {/* Ссылка "Подробнее" */}
            <div className="flex items-center justify-end gap-2 mt-3 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              <span>Подробнее</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};