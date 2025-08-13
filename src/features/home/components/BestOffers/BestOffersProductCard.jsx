import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../shared/utils/formatPrice';
import { AdminGuard } from '../../../auth/components/AdminGuard';

export const BestOffersProductCard = ({ product, index, configuredId, onUpdateId, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');

  const handleStartEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditId(configuredId?.toString() || '');
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newId = parseInt(editId) || 0;
    onUpdateId(index, newId);
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
    setEditId('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  if (!product) {
    return (
      <div className="bg-white border border-red-200 overflow-hidden h-full flex flex-col text-center">
        {/* Админ панель для несуществующего товара */}
        <AdminGuard>
          <div className="bg-red-50 px-3 py-2 border-b border-red-200 flex items-center justify-between">
            <span className="text-xs text-red-600 font-mono">ID: {configuredId}</span>
            {!isEditing && <span className="text-xs text-red-600">Товар не найден</span>}
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={editId}
                  onChange={(e) => setEditId(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="ID товара"
                  className="px-2 py-1 text-xs border border-red-300 focus:outline-none rounded"
                  autoFocus
                  disabled={isUpdating}
                />
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors duration-300 disabled:opacity-50"
                  type="button"
                  aria-label="Сохранить"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors duration-300 disabled:opacity-50"
                  type="button"
                  aria-label="Отмена"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartEdit}
                className="p-1 text-red-400 hover:text-red-600 transition-colors duration-300"
                type="button"
                aria-label="Редактировать ID товара"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
          </div>
        </AdminGuard>

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
        <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden h-full flex flex-col hover:border-gray-400 transition-colors duration-300 text-center">

          {/* Админ панель внутри карточки */}
          <AdminGuard>
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-600 font-mono">ID: {configuredId}</span>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={editId}
                    onChange={(e) => setEditId(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="ID товара"
                    className="px-2 py-1 text-xs border border-gray-300 focus:outline-none rounded"
                    autoFocus
                    disabled={isUpdating}
                  />
                  <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300 disabled:opacity-50"
                    type="button"
                    aria-label="Сохранить"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300 disabled:opacity-50"
                    type="button"
                    aria-label="Отмена"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStartEdit}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  type="button"
                  aria-label={`Редактировать ${product?.model || product?.name || 'товар'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
          </AdminGuard>

          <div className="h-80 flex flex-col items-center justify-center flex-shrink-0 relative pt-5">
            {product.images && product.images[0] && (
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
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};