import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

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
        <Search />
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="block text-3xl font-medium text-gray-700 py-4"
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <Search />
  );
};

export default Navigation; 