import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { CartActions } from '../components/CartActions';
import { EmptyCart } from './EmptyCart';
import { useAuth } from '../../auth/hooks/useAuth';

export const Cart = () => {
  const { items, isEmpty, isLoading, error, calculations } = useCart();
  const { isAuthenticated } = useAuth();

  // Если пользователь не авторизован
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-light mb-4">Необходима авторизация</h2>
          <p className="text-gray-600 mb-6">
            Для работы с корзиной необходимо войти в аккаунт
          </p>
          <Link
            to="/login"
            state={{ from: '/cart' }}
            className="inline-block px-8 py-4 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            Войти в аккаунт
          </Link>
        </div>
      </div>
    );
  }

  // Загрузка
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Загрузка корзины...</p>
        </div>
      </div>
    );
  }

  // Ошибка
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-light text-gray-900 mb-2">Ошибка загрузки</h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  // Пустая корзина
  if (isEmpty) {
    return <EmptyCart />;
  }

  // Корзина с товарами
  return (
    <div className="min-h-screen bg-white">
      {/* Заголовок */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Link to="/catalog" className="text-gray-500 hover:text-gray-900 inline-block mb-8">
            ← Назад к каталогу
          </Link>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
            Корзина
          </h1>
          <p className="text-lg text-gray-600">
            {calculations.totalItems} товаров на сумму {calculations.subtotal.toLocaleString()} ₽
          </p>
        </div>
      </section>

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Товары */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Сайдбар */}
          <div className="space-y-6">
            <CartSummary calculations={calculations} />
            <CartActions />
          </div>
        </div>
      </div>
    </div>
  );
};