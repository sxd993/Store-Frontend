// src/pages/Home/BestOffersProductCard.jsx
import { memo, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../shared/utils/formatPrice';
import { useAuth } from '../../auth/hooks/useAuth';

export const BestOffersProductCard = memo(({ 
  product, 
  index, 
  onProductChange
}) => {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newProductId, setNewProductId] = useState('');
  console.log(product)
  // Мемоизируем вычисляемые значения
  const formattedPrice = useMemo(() => 
    product ? formatPrice(product.price) : '', 
    [product?.price]
  );

  const productLink = useMemo(() => 
    product ? `/product/${product.id}` : '#', 
    [product?.id]
  );

  const displayName = useMemo(() => 
    product ? (product.model || product.name) : 'Товар не найден', 
    [product?.model, product?.name]
  );

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setNewProductId(product?.id?.toString() || '');
  }, [product?.id]);

  const handleSave = useCallback(() => {
    if (!newProductId.trim()) return;
    
    const id = parseInt(newProductId);
    if (isNaN(id)) {
      alert('Введите корректный ID товара');
      return;
    }

    onProductChange(index, id);
    setIsEditing(false);
  }, [index, onProductChange, newProductId]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setNewProductId('');
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  if (!product) {
    return (
      <div className="group h-full">
        <div className="bg-white border border-red-200 overflow-hidden h-full flex flex-col text-center">
          {/* Админское управление */}
          {isAdmin && (
            <div className="bg-red-50 px-3 py-2 border-b border-red-200">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={newProductId}
                    onChange={(e) => setNewProductId(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="ID товара"
                    className="flex-1 px-2 py-1 text-xs border border-red-300 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 border border-green-600 bg-white text-green-600 text-xs hover:bg-green-600 hover:text-white font-light transition-colors duration-300"
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 border border-gray-400 bg-white text-gray-600 text-xs hover:bg-gray-400 hover:text-white font-light transition-colors duration-300"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full text-left px-3 py-2 text-xs bg-white border border-red-300 rounded hover:bg-red-50 transition-colors duration-200"
                >
                  Товар не найден - введите ID
                </button>
              )}
            </div>
          )}
          
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <svg className="w-12 h-12 text-red-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm text-red-600">Товар не найден</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group h-full">
      <Link to={productLink} className="block h-full">
        <div className="bg-white border border-gray-200 overflow-hidden h-full flex flex-col hover:border-gray-300 transition-colors duration-300 text-center">
          
          {/* Админское управление */}
          {isAdmin && (
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
              {isEditing ? (
                <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                  <input
                    type="number"
                    value={newProductId}
                    onChange={(e) => setNewProductId(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="ID товара"
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSave();
                    }}
                    className="px-3 py-1 border border-gray-900 bg-white text-gray-900 text-xs hover:bg-gray-900 hover:text-white font-light transition-colors duration-300"
                    type="button"
                  >
                    ✓
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCancel();
                    }}
                    className="px-3 py-1 border border-gray-400 bg-white text-gray-600 text-xs hover:bg-gray-400 hover:text-white font-light transition-colors duration-300"
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleStartEdit();
                  }}
                  className="w-full text-left px-3 py-2 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
                  type="button"
                >
                  <span className="font-mono">ID: {product.id}</span> - Изменить товар
                </button>
              )}
            </div>
          )}
          
          {/* Изображение товара */}
          <div className="h-80 flex flex-col items-center justify-center flex-shrink-0 relative pt-5">
            {product.images && (
              <img
                src={product.images[0].url}
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