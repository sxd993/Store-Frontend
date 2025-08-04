import React from 'react';

const PromoInfo = ({ className = '' }) => {
  return (
    <div className={`hidden md:flex items-center space-x-4 text-sm text-gray-600 ${className}`}>
      <span className="flex items-center space-x-1">
        <span>⚡</span>
        <span>Быстрая доставка</span>
      </span>
      <span className="flex items-center space-x-1">
        <span>🛡️</span>
        <span>Гарантия Apple</span>
      </span>
    </div>
  );
};

export default PromoInfo; 