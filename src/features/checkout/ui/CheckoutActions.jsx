import { memo } from 'react';
import { Link } from 'react-router-dom';

export const CheckoutActions = memo(({ 
  onSubmit, 
  isLoading = false, 
  isFormValid = false 
}) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onSubmit}
        disabled={isLoading || !isFormValid}
        className="w-full py-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors duration-300 font-light disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Создание заказа...</span>
          </div>
        ) : (
          'Оформить заказ'
        )}
      </button>
      
      <Link
        to="/cart"
        className="w-full block px-6 py-3 border border-gray-200 text-gray-700 text-center rounded-2xl hover:bg-gray-50 transition-colors duration-300 font-light"
      >
        ← Вернуться в корзину
      </Link>
    </div>
  );
});