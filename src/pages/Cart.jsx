import { Link } from 'react-router-dom';
import { useCart } from '../features/commerce/hooks/useCart';
import { CartItem } from '../features/commerce/components/CartItem';
import { CartSummary } from '../features/commerce/components/CartSummary';
import { CartActions } from '../features/commerce/components/CartActions';
import { EmptyCart } from '../features/commerce/ui/EmptyCart';
import { useAuth } from '../features/auth/hooks/useAuth';

export const Cart = () => {
  const { items, isEmpty, isLoading, error, calculations } = useCart();
  const { isAuthenticated } = useAuth();

  // Если пользователь не авторизован
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Необходима авторизация
          </h2>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            Для работы с корзиной необходимо войти в аккаунт
          </p>
          <Link
            to="/login"
            state={{ from: '/cart' }}
            className="inline-block px-8 py-3 border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors duration-300 text-sm"
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
          <div className="animate-spin rounded-full h-8 w-8 border-b border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Загрузка корзины...</p>
        </div>
      </div>
    );
  }

  // Ошибка
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h3 className="text-lg font-light text-gray-900 mb-3">Ошибка загрузки</h3>
          <p className="text-gray-600 mb-6 text-sm">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors duration-300 text-sm"
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
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-8">
            Корзина
          </h1>
        </div>

        {/* Контент */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Товары */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Сайдбар */}
            <div className="space-y-4">
              <CartSummary calculations={calculations} />
              <CartActions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};