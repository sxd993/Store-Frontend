import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { EmptyCart } from '../components/EmptyCart';
import { useCart } from '../hooks/useCart';
import { useCartStore } from '../../../shared/store/cartStore';

export const Cart = () => {
  const {
    formattedCartItems,
    isEmpty,
    isLoading,
    calculations,
    error
  } = useCart();

  const { setCheckoutStep } = useCartStore((state) => ({
    setCheckoutStep: state.setCheckoutStep
  }));

  // Сброс шага оформления при монтировании
  useEffect(() => {
    setCheckoutStep('cart');
    window.scrollTo(0, 0);
  }, [setCheckoutStep]);

  // Если идет загрузка
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Загрузка корзины...</p>
        </div>
      </div>
    );
  }

  // Если есть ошибка
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-4 text-lg font-light text-gray-900">Ошибка загрузки корзины</h3>
            <p className="mt-2 text-gray-500 font-light mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="inline-block border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Если корзина пуста
  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Заголовок */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center mb-8">
            <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
              ← Назад к каталогу
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            Корзина
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            {`${calculations.totalItems} ${
              calculations.totalItems === 1 ? 'товар' : 
              calculations.totalItems < 5 ? 'товара' : 'товаров'
            } на сумму ${calculations.subtotal.toLocaleString()} ₽`}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Список товаров */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {formattedCartItems.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item}
                />
              ))}
            </div>
          </div>

          {/* Итого и оформление заказа */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};