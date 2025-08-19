import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../../auth/hooks/useAuth';
import { CartList } from '../ui/CartList';
import { CartSummary } from '../ui/CartSummary';
import { CartActions } from '../ui/CartActions';
import { EmptyCart } from '../ui/EmptyCart';
import { ErrorState } from '../../../shared/ui/states/ErrorState';
import { LoadingState } from '../../../shared/ui/states/LoadingState';

export const CartContainer = () => {
  const { 
    items, 
    isEmpty, 
    isLoading, 
    error,
    updateQuantity,
    removeItem,
    isUpdating,
    isRemoving
  } = useCart();
  const { isAuthenticated } = useAuth();

  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity({ productId: itemId, quantity: newQuantity });
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((itemId) => {
    if (window.confirm('Удалить товар из корзины?')) {
      removeItem(itemId);
    }
  }, [removeItem]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Необходима авторизация
          </h2>
          <p className="text-gray-600 mb-8 text-base leading-relaxed font-light">
            Для работы с корзиной необходимо войти в аккаунт
          </p>
          <Link
            to="/login"
            state={{ from: '/cart' }}
            className="inline-block px-8 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 text-sm rounded-2xl font-light"
          >
            Войти в аккаунт
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (isEmpty) return <EmptyCart />;

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-light text-gray-900">
            Корзина
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartList 
              items={items}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              isUpdating={isUpdating}
              isRemoving={isRemoving}
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <CartSummary />
            <CartActions />
          </div>
        </div>
      </div>
    </section>
  );
};