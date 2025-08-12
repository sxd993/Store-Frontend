import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { PriceDisplay } from '../../../shared/ui/PriceDisplay';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeItem, isUpdating, isRemoving } = useCart();
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    setLocalQuantity(newQuantity);
    updateQuantity({ productId: item.id, quantity: newQuantity });
  };

  const handleRemove = () => {
    if (window.confirm('Удалить товар из корзины?')) {
      removeItem(item.id);
    }
  };

  const isDisabled = isUpdating || isRemoving;

  return (
    <div className={`bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors duration-300 ${
      isDisabled ? 'opacity-50' : ''
    }`}>
      {/* Desktop версия */}
      <div className="hidden md:flex gap-4 p-4">
        {/* Изображение */}
        <div className="w-24 h-24 flex-shrink-0">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-medium text-base text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {item.name}
          </h3>
          <div className="space-y-1 mb-3 text-xs text-gray-600">
            {item.color && (
              <p>
                <span className="font-medium">Цвет:</span> {item.color}
              </p>
            )}
            {item.memory && (
              <p>
                <span className="font-medium">Память:</span> {item.memory}
              </p>
            )}
          </div>
          <PriceDisplay price={item.price} className="text-base" />
        </div>

        {/* Количество */}
        <div className="flex items-center gap-2 self-center">
          <button
            onClick={() => handleQuantityChange(localQuantity - 1)}
            disabled={isDisabled || localQuantity <= 1}
            className="w-8 h-8 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 text-sm transition-colors duration-300 flex items-center justify-center"
          >
            -
          </button>
          <input
            type="number"
            value={localQuantity}
            onChange={(e) => setLocalQuantity(Number(e.target.value))}
            onBlur={() => handleQuantityChange(localQuantity)}
            disabled={isDisabled}
            className="w-16 text-center flex items-center justify-center border border-gray-200 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            min="1"
            max="99"
          />
          <button
            onClick={() => handleQuantityChange(localQuantity + 1)}
            disabled={isDisabled || localQuantity >= 99}
            className="w-8 h-8 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 text-sm transition-colors duration-300 flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Сумма */}
        <div className="text-right min-w-[100px] self-center">
          <PriceDisplay price={item.price * item.quantity} className="font-medium text-base" />
        </div>

        {/* Удалить */}
        <button
          onClick={handleRemove}
          disabled={isDisabled}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed p-2 transition-colors duration-300 self-center rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile версия */}
      <div className="md:hidden p-4 space-y-4">
        {/* Верхняя часть: изображение и информация */}
        <div className="flex gap-3">
          {/* Изображение */}
          <div className="w-20 h-20 flex-shrink-0">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Информация */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">
              {item.name}
            </h3>
            <div className="space-y-1 mb-2 text-xs text-gray-600">
              {item.color && (
                <p>
                  <span className="font-medium">Цвет:</span> {item.color}
                </p>
              )}
              {item.memory && (
                <p>
                  <span className="font-medium">Память:</span> {item.memory}
                </p>
              )}
            </div>
            <PriceDisplay price={item.price} className="text-sm" />
          </div>

          {/* Кнопка удаления */}
          <button
            onClick={handleRemove}
            disabled={isDisabled}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed p-2 transition-colors duration-300 rounded flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Нижняя часть: количество и сумма */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {/* Количество */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(localQuantity - 1)}
              disabled={isDisabled || localQuantity <= 1}
              className="w-7 h-7 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 text-sm transition-colors duration-300 flex items-center justify-center"
            >
              -
            </button>
            <input
              type="number"
              value={localQuantity}
              onChange={(e) => setLocalQuantity(Number(e.target.value))}
              onBlur={() => handleQuantityChange(localQuantity)}
              disabled={isDisabled}
              className="w-12 text-center border border-gray-200 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              min="1"
              max="99"
            />
            <button
              onClick={() => handleQuantityChange(localQuantity + 1)}
              disabled={isDisabled || localQuantity >= 99}
              className="w-7 h-7 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 text-sm transition-colors duration-300 flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* Сумма */}
          <div className="text-right">
            <PriceDisplay price={item.price * item.quantity} className="font-medium text-base" />
          </div>
        </div>
      </div>
    </div>
  );
};
