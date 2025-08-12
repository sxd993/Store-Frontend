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
    <div className="space-y-4">
      <button
        onClick={handleCheckout}
        className="w-full px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
      >
        Оформить заказ
      </button>
      
      <button
        onClick={() => navigate('/catalog')}
        className="w-full px-8 py-3 border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        Продолжить покупки
      </button>
      
      <button
        onClick={handleClear}
        disabled={isClearing}
        className="w-full px-8 py-3 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
      >
        {isClearing ? 'Очистка...' : 'Очистить корзину'}
      </button>
    </div>
  );
};