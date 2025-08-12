import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { useCartApi } from '../hooks/useCartApi';

export const CartActions = ({ className = '' }) => {
  const { isAuthenticated } = useAuth();
  const { isEmpty, clearCart, isClearing } = useCartApi();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: { pathname: '/cart' },
          message: 'Для оформления заказа необходимо войти в аккаунт'
        }
      });
      return;
    }
    console.log('Оформление заказа...');
  };

  const handleClearCart = () => {
    if (isClearing) return;
    
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      clearCart();
    }
  };

  if (isEmpty) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <button
        onClick={handleCheckout}
        disabled={isClearing}
        className="w-full px-8 py-4 border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-lg disabled:opacity-50"
      >
        {isAuthenticated ? 'Оформить заказ' : 'Войти и оформить заказ'}
      </button>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/catalog"
          className="flex-1 px-6 py-3 border-2 border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 font-light transition-colors duration-300 text-center"
        >
          Продолжить покупки
        </Link>

        <button
          onClick={handleClearCart}
          disabled={isClearing}
          className="flex-1 px-6 py-3 border-2 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed font-light transition-colors duration-300"
        >
          {isClearing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Очистка...
            </div>
          ) : (
            'Очистить корзину'
          )}
        </button>
      </div>

      {!isAuthenticated && (
        <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 p-4 rounded">
          <p className="font-light mb-2">
            <strong>Для оформления заказа:</strong>
          </p>
          <ul className="space-y-1 font-light">
            <li>• Войдите в существующий аккаунт</li>
            <li>• Или создайте новый аккаунт</li>
            <li>• Ваша корзина сохранится автоматически</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Link
              to="/login"
              state={{ from: { pathname: '/cart' } }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Войти
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/register"
              state={{ from: { pathname: '/cart' } }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Регистрация
            </Link>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-light">Безопасная оплата</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="font-light">Защита данных</span>
          </div>
        </div>
      </div>
    </div>
  );
};