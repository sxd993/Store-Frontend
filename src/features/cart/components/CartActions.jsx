import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export const CartActions = () => {
  const navigate = useNavigate();
  const { clearCart, isClearing } = useCart();

  const handleCheckout = () => {
    // Здесь будет логика оформления заказа
    console.log('Оформление заказа...');
  };

  const handleClear = () => {
    if (window.confirm('Очистить корзину?')) {
      clearCart();
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        className="w-full px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300 rounded-lg font-light disabled:opacity-50"
      >
        Оформить заказ
      </button>
      
      <button
        onClick={handleClear}
        disabled={isClearing}
        className="w-full px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300 rounded-lg font-light disabled:opacity-50"
      >
        {isClearing ? 'Очистка...' : 'Очистить корзину'}
      </button>
    </div>
  );
};