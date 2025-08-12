import { useState } from 'react';
import { CartItemImage } from './CartItemImage';
import { CartQuantitySelector } from './CartQuantitySelector';
import { PriceDisplay } from '../../../shared/ui/PriceDisplay';
import { useCart } from '../hooks/useCart';

export const CartItem = ({ item, className = '' }) => {
  const { removeFromCart, isRemoving } = useCart();
  const [isRemoving_local, setIsRemoving_local] = useState(false);

  const handleRemove = async () => {
    if (isRemoving_local || isRemoving) return;
    
    setIsRemoving_local(true);
    const result = await removeFromCart(item.id);
    
    if (!result.success) {
      console.error('Ошибка удаления товара:', result.error);
      setIsRemoving_local(false);
      // Здесь можно показать уведомление об ошибке
    }
    // Если успешно, компонент исчезнет сам благодаря обновлению списка
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className={`flex items-center gap-4 md:gap-6 p-4 md:p-6 border border-gray-200 bg-white transition-opacity duration-200 ${isRemoving_local ? 'opacity-50' : ''} ${className}`}>
      {/* Изображение товара */}
      <CartItemImage
        src={item.image}
        alt={item.name}
        className="w-16 h-16 md:w-20 md:h-20"
      />

      {/* Информация о товаре */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-light text-gray-900 mb-1 truncate">
          {item.name}
        </h3>
        
        {/* Характеристики */}
        {item.displaySpecs && (
          <p className="text-sm text-gray-500 font-light mb-2">
            {item.displaySpecs}
          </p>
        )}

        {/* Цена за единицу */}
        <div className="flex items-center justify-between md:hidden">
          <PriceDisplay price={item.price} size="medium" />
          <PriceDisplay price={totalPrice} size="medium" className="font-medium" />
        </div>
      </div>

      {/* Цена за единицу (desktop) */}
      <div className="hidden md:block text-right">
        <PriceDisplay price={item.price} size="large" />
      </div>

      {/* Количество */}
      <div className="flex flex-col items-center gap-2">
        <CartQuantitySelector
          productId={item.id}
          currentQuantity={item.quantity}
          size="medium"
        />
      </div>

      {/* Итого за товар (desktop) */}
      <div className="hidden md:block text-right min-w-[100px]">
        <PriceDisplay 
          price={totalPrice} 
          size="large" 
          className="font-medium" 
        />
      </div>

      {/* Кнопка удаления */}
      <button
        onClick={handleRemove}
        disabled={isRemoving_local || isRemoving}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200 disabled:cursor-not-allowed p-2 -m-2"
        title="Удалить товар"
      >
        {isRemoving_local || isRemoving ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    </div>
  );
};