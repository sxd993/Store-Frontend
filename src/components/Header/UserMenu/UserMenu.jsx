import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
        <span>👤</span>
        <span className="hidden sm:block">Войти</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-2">
          <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Войти в аккаунт
          </Link>
          <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Регистрация
          </Link>
          <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Мои заказы
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMenu; 