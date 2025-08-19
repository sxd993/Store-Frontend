import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export const CartActions = memo(() => {
  const { clearCart, isClearing } = useCart();

  const handleClear = () => {
    if (window.confirm('Очистить корзину?')) {
      clearCart();
    }
  };

  return (
    <div className="space-y-3">
      <Link
        to="/checkout"
        className="w-full block px-6 py-3 bg-gray-900 text-white text-center rounded-2xl hover:bg-gray-800 transition-colors duration-300 font-light"
      >
        Перейти к оформлению
      </Link>
      
      <button
        onClick={handleClear}
        disabled={isClearing}
        className="w-full px-6 py-3 border border-red-300 text-red-600 rounded-2xl hover:bg-red-50 transition-colors duration-300 font-light disabled:opacity-50"
      >
        {isClearing ? 'Очистка...' : 'Очистить корзину'}
      </button>
    </div>
  );
});
