import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Имитация добавления в корзину
    console.log('Добавлен в корзину: iPhone 15 Pro Max');
    
    // Показываем уведомление на 2 секунды
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 2000);
  };

  return (
    <section className="relative w-full bg-white border-b border-gray-100">
      <div className="py-8 md:py-16 flex flex-col md:flex-row items-center min-h-[600px]">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center mb-12 md:mb-0 md:pr-12">
          <div className="w-full max-w-lg overflow-hidden flex items-center justify-center">
            <img
              alt="iPhone 15 Pro Max"
              src='https://s3.twcstorage.ru/596b6535-030ac4e4-0e39-4a9c-bb07-ffa6936ce428/iphone-images/iphone%2015%20pro%20max%20white.jpg'
              className="object-contain w-full h-auto max-h-112 md:max-h-144"
              onError={(e) => {
                console.log('Image failed to load');
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center md:pl-12">
          <h1 className="text-4xl md:text-7xl font-light text-gray-900 mb-8 leading-tight">
            iPhone 15 Pro Max
          </h1>
          <p className="text-lg md:text-2xl text-center text-gray-600 mb-8 font-light leading-relaxed">
            Титан. Очень прочный. Очень лёгкий. Очень айвон. Очень 15. Очень Pro. Очень Max.
          </p>
          <p className="text-base md:text-lg text-gray-500 text-center mb-12 max-w-xl leading-relaxed">
            Откройте для себя новую эру iPhone с революционным дизайном из титана, 
            мощным чипом A17 Pro и профессиональной камерой. 
          </p>
          <div className="flex gap-6 items-center">
            <Link
              to="/product/iphone-15-pro"
              className="border-2 border-gray-900 bg-white text-gray-900 px-10 py-4 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              Купить
            </Link>
            <Link
              to="/product/iphone-15-pro"
              className="border-2 border-gray-300 bg-gray-50 text-gray-700 px-10 py-4 font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Подробнее
            </Link>
            {/* Ненавязчивая кнопка добавления в корзину */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`p-3 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300 ${
                isAddingToCart 
                  ? 'bg-green-50 border-green-200 text-green-600' 
                  : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800'
              }`}
              title="Добавить в корзину"
            >
              {isAddingToCart ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </button>
          </div>
          {/* Уведомление о добавлении в корзину */}
          {isAddingToCart && (
            <div className="mt-4 text-sm text-green-600 font-light animate-pulse">
              Добавлено в корзину ✓
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;