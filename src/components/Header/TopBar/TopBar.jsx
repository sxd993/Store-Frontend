import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-blue-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📞 8-800-555-35-35</span>
            <span>📧 info@iphone-store.ru</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>🚚 Бесплатная доставка от 5000₽</span>
            <span>🛡️ Гарантия Apple</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 