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
    <section className="py-24 md:py-32 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 max-w-7xl mx-auto">
          {/* Изображение */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xl lg:max-w-2xl overflow-hidden flex items-center justify-center">
              <img
                alt="iPhone 15 Pro Max"
                src='https://s3.twcstorage.ru/596b6535-030ac4e4-0e39-4a9c-bb07-ffa6936ce428/iphone-images/iphone%2015%20pro%20max%20white.jpg'
                className="object-contain w-full h-auto max-h-[500px] lg:max-h-[600px]"
                onError={(e) => {
                  console.log('Image failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Контент */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight">
              iPhone 15 Pro Max
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 mb-8 font-light leading-relaxed">
              Титан. Очень прочный. Очень лёгкий. Очень айвон. Очень 15. Очень Pro. Очень Max.
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
              Откройте для себя новую эру iPhone с революционным дизайном из титана, 
              мощным чипом A17 Pro и профессиональной камерой. 
            </p>
            <div className="flex gap-6 items-center">
              <Link
                to="/product/iphone-15-pro"
                className="px-10 py-4 md:px-12 md:py-5 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-lg"
              >
                Купить
              </Link>
              <Link
                to="/product/iphone-15-pro"
                className="px-10 py-4 md:px-12 md:py-5 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 text-lg"
              >
                Подробнее
              </Link>
            </div>
            {/* Уведомление о добавлении в корзину */}
            {isAddingToCart && (
              <div className="mt-6 text-base text-green-600 font-light animate-pulse">
                Добавлено в корзину ✓
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;