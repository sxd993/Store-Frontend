import { CartItemImage } from './CartItemImage';
import { CartQuantitySelector } from './CartQuantitySelector';
import { PriceDisplay } from '../../../shared/ui/PriceDisplay';
import { useCartApi } from '../hooks/useCartApi';

export const CartItem = ({ item, className = '' }) => {
  const { removeFromCart, isItemRemoving } = useCartApi();
  const isRemoving = isItemRemoving(item.id);

  const handleRemove = () => {
    if (isRemoving) return;
    
    if (window.confirm('Удалить товар из корзины?')) {
      removeFromCart(item.id);
    }
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className={`flex items-center gap-4 md:gap-6 p-4 md:p-6 border border-gray-200 bg-white transition-all duration-300 ${
      isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
    } ${className}`}>
      
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

        {item.displaySpecs && (
          <p className="text-sm text-gray-500 font-light mb-2">
            {item.displaySpecs}
          </p>
        )}

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
          disabled={isRemoving}
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
        disabled={isRemoving}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 p-2 -m-2"
        title="Удалить товар"
      >
        {isRemoving ? (
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