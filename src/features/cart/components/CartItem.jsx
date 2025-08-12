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
    <div className={`flex gap-6 p-6 border border-gray-200 bg-white ${
      isDisabled ? 'opacity-50' : ''
    }`}>
      {/* Изображение */}
      <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Информация */}
      <div className="flex-1">
        <h3 className="text-lg font-light mb-2">{item.name}</h3>
        {item.color && <p className="text-sm text-gray-500">Цвет: {item.color}</p>}
        {item.memory && <p className="text-sm text-gray-500">Память: {item.memory}</p>}
        <PriceDisplay price={item.price} className="mt-2" />
      </div>

      {/* Количество */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(localQuantity - 1)}
          disabled={isDisabled || localQuantity <= 1}
          className="w-8 h-8 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          -
        </button>
        <input
          type="number"
          value={localQuantity}
          onChange={(e) => setLocalQuantity(Number(e.target.value))}
          onBlur={() => handleQuantityChange(localQuantity)}
          disabled={isDisabled}
          className="w-16 text-center border border-gray-300 py-1"
          min="1"
          max="99"
        />
        <button
          onClick={() => handleQuantityChange(localQuantity + 1)}
          disabled={isDisabled || localQuantity >= 99}
          className="w-8 h-8 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          +
        </button>
      </div>

      {/* Сумма */}
      <div className="text-right min-w-[100px]">
        <PriceDisplay price={item.price * item.quantity} className="font-medium" />
      </div>

      {/* Удалить */}
      <button
        onClick={handleRemove}
        disabled={isDisabled}
        className="text-gray-400 hover:text-red-500 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
