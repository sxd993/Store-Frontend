import { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../shared/utils/formatPrice';
import { useAuth } from '../../../auth/hooks/useAuth';
import { AdminGuard } from '../../../auth/components/AdminGuard';

export const ProductCard = memo(({ product, onEditClick }) => {
  const { isAdmin } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const productImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.map(img => img.url || img);
    }
    return product.image ? [product.image] : [];
  }, [product.images, product.image]);

  const currentImage = productImages[currentImageIndex] || null;
  const hasMultipleImages = productImages.length > 1;

  const handleEditClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onEditClick(product);
  }, [product, onEditClick]);

  const nextImage = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % productImages.length);
  }, [productImages.length]);

  const prevImage = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1);
  }, [productImages.length]);

  return (
    <div className="group h-full">
      <Link
        to={productLink}
        className="block h-full"
      >
        <div className="bg-white border border-gray-200 overflow-hidden h-full flex flex-col hover:border-gray-300 transition-colors duration-300 text-center">
          
          <AdminGuard>
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-600 font-mono">ID: {product.id}</span>
              {onEditClick && (
                <button
                  onClick={handleEditClick}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  type="button"
                  aria-label={`Редактировать ${displayName}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
          </AdminGuard>
          
          <div className="h-80 flex flex-col items-center justify-center flex-shrink-0 relative pt-5">
            {currentImage ? (
              <>
                <img
                  src={currentImage}
                  alt={displayName}
                  className="w-full h-full object-contain p-3"
                  loading="lazy"
                  onError={(e) => {
                    if (currentImageIndex < productImages.length - 1) {
                      setCurrentImageIndex(prev => prev + 1);
                    }
                  }}
                />
                
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {productImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col flex-1 items-center justify-center">
            <h3 className="font-medium text-base text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2 text-center">
              {displayName}
            </h3>
            
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
            
            <div className="flex items-center justify-center pt-3 border-t border-gray-100 text-xl font-light text-gray-900 mt-auto w-full">
              <p className="text-center">
                {formattedPrice}
              </p>
            </div>
            
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