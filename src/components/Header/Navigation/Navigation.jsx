import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isMobile = false, onItemClick }) => {
  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Каталог', path: '/catalog' },
    { name: 'О нас', path: '/about' },
    { name: 'Контакты', path: '/contacts' }
  ];

  if (isMobile) {
    return (
      <div className="space-y-8">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="block text-2xl font-medium text-gray-900 hover:text-gray-700 transition-colors"
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="text-gray-900 hover:text-gray-700 font-light transition-colors duration-300"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation; 