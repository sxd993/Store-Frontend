import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesIcon = ({ itemCount = 0 }) => (
  <Link to="/favorites" className="relative text-gray-900 hover:text-gray-700 transition-colors">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
    {itemCount > 0 && (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
        {itemCount}
      </span>
    )}
  </Link>
);

export default FavoritesIcon;