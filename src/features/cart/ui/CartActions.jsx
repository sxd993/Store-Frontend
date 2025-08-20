import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export const CartActions = memo(() => {
  const { clearCart, isClearing } = useCart();

  const handleClear = () => {
    clearCart();
  };

  return (
    <div className="space-y-3">
      <Link
        to="/checkout"
        className="w-full block px-4 py-3 bg-blue-600 text-white text-center rounded-2xl hover:bg-blue-700 transition-colors duration-300 font-light"
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
