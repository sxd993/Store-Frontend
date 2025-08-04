import React from 'react';
import { Link } from 'react-router-dom';

const CartIcon = ({ itemCount = 0 }) => {
  return (
    <Link to="/cart" className="text-gray-900 hover:text-gray-700 transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </Link>
  );
};

export default CartIcon; 