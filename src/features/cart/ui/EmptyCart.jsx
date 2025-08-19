import { memo } from 'react';
import { Link } from 'react-router-dom';

export const EmptyCart = memo(({ className = '' }) => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Иконка */}
          <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          {/* Заголовок */}
          <h3 className="text-3xl font-light text-gray-900 mb-4">
            Корзина пуста
          </h3>

          {/* Описание */}
          <p className="text-gray-600 mb-8 text-base leading-relaxed font-light">
            Добавьте товары из каталога, чтобы они отображались здесь
          </p>

          {/* Действия */}
          <div className="space-y-3 max-w-xs mx-auto">
            <Link
              to="/catalog"
              className="inline-block w-full px-8 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-sm text-center rounded-2xl"
            >
              Перейти в каталог
            </Link>
            
            <Link
              to="/"
              className="block w-full px-8 py-3 border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 font-light transition-colors duration-300 text-sm text-center rounded-2xl"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});