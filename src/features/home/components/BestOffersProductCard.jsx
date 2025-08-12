import { Link } from 'react-router-dom';
import { formatPrice } from '../../../shared/utils/formatPrice';
import { useAuth } from '../../auth/hooks/useAuth';
import { useProductEdit } from '../hooks/useProductEdit';

export const BestOffersProductCard = ({ product, index, onProductChange }) => {
  const { isAdmin } = useAuth();
  const {
    isEditing,
    newProductId,
    setNewProductId,
    handleStartEdit,
    handleSave,
    handleCancel,
    handleKeyPress
  } = useProductEdit(product, index, onProductChange);

  if (!product) {
    return (
      <div className="bg-white border border-red-200 overflow-hidden h-full flex flex-col text-center">
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
                  className="flex-1 px-2 py-1 text-xs border border-red-300 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-1 border border-gray-900 bg-white text-gray-900 text-xs hover:bg-gray-900 hover:text-white transition-colors duration-300"
                >
                  ✓
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 border border-gray-400 bg-white text-gray-600 text-xs hover:bg-gray-400 hover:text-white transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartEdit}
                className="w-full text-left px-3 py-2 text-xs bg-white border border-red-300 hover:bg-red-50 transition-colors duration-200"
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
    );
  }

  return (
    <div className="group h-full">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="bg-white border border-gray-200 overflow-hidden h-full flex flex-col hover:border-gray-300 transition-colors duration-300 text-center">
          
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
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSave();
                    }}
                    className="px-3 py-1 border border-gray-900 bg-white text-gray-900 text-xs hover:bg-gray-900 hover:text-white transition-colors duration-300"
                  >
                    ✓
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCancel();
                    }}
                    className="px-3 py-1 border border-gray-400 bg-white text-gray-600 text-xs hover:bg-gray-400 hover:text-white transition-colors duration-300"
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
                  className="w-full text-left px-3 py-2 text-xs bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  ID: {product.id} - Изменить
                </button>
              )}
            </div>
          )}
          
          <div className="h-80 flex flex-col items-center justify-center flex-shrink-0 relative pt-5">
            {product.images && (
              <img
                src={product.images[0].url}
                alt={product.model || product.name}
                className="w-full h-full object-contain p-3"
                loading="lazy"
              />
            )}
          </div>

          <div className="p-4 flex flex-col flex-1 items-center justify-center">
            <h3 className="font-medium text-base text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2 text-center">
              {product.model || product.name}
            </h3>
            
            <div className="space-y-1 mb-3 text-xs text-gray-600 flex-1 text-center">
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
            
            <div className="flex items-center justify-center pt-3 border-t border-gray-100 text-xl font-light text-gray-900 mt-auto w-full">
              <p className="text-center">
                {formatPrice(product.price)}
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
};