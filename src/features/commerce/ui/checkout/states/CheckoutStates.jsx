import { memo } from 'react';
import { Link } from 'react-router-dom';

export const CheckoutLoading = memo(() => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded-2xl w-1/3"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="space-y-4">
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  </div>
));

export const CheckoutError = memo(({ error }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-light text-gray-900 mb-4">
        Ошибка оформления заказа
      </h3>
      
      <p className="text-gray-600 text-sm font-light mb-6">
        {error?.message || 'Не удалось оформить заказ. Попробуйте еще раз.'}
      </p>
      
      <div className="space-y-3 max-w-xs mx-auto">
        <Link
          to="/"
          className="w-full block px-6 py-3 border border-gray-200 text-gray-700 text-center rounded-2xl hover:bg-gray-50 transition-colors duration-300 font-light"
        >
          На главную
        </Link>
      </div>
    </div>
  </div>
));