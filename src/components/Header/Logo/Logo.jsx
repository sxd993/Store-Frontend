import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="text-2xl">🍎</div>
      <div>
        <div className="text-xl font-bold text-gray-800">iPhone Store</div>
        <div className="text-xs text-gray-600">Официальный партнер Apple</div>
      </div>
    </Link>
  );
};

export default Logo; 