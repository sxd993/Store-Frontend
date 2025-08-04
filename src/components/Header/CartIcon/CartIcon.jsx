import React from 'react';
import { Link } from 'react-router-dom';

const CartIcon = ({ itemCount = 0 }) => {
  return (
    <Link to="/cart" className="relative flex items-center space-x-1 text-gray-600 hover:text-blue-600">
      <span>🛒</span>
      <span className="hidden sm:block">Корзина</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon; 