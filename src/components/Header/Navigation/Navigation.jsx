import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ categories = [], isMobile = false, onItemClick }) => {
  const defaultCategories = [
    { name: 'iPhone 15 Pro', path: '/iphone-15-pro' },
    { name: 'iPhone 15', path: '/iphone-15' },
    { name: 'iPhone 14 Pro', path: '/iphone-14-pro' },
    { name: 'Чехлы', path: '/cases' },
    { name: 'Стекла', path: '/screen-protectors' },
    { name: 'Аксессуары', path: '/accessories' }
  ];

  const navCategories = categories.length > 0 ? categories : defaultCategories;

  if (isMobile) {
    return (
      <div className="md:hidden py-4 border-t border-gray-200">
        <div className="space-y-2">
          {navCategories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onItemClick}
            >
              {category.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>⚡</span>
                <span>Быстрая доставка</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🛡️</span>
                <span>Гарантия Apple</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navCategories.map((category, index) => (
        <Link
          key={index}
          to={category.path}
          className="py-4 px-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation; 