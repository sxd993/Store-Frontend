import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full bg-white border-b border-gray-100">
      <div className="py-8 md:py-16 flex flex-col md:flex-row items-center min-h-[600px]">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center mb-12 md:mb-0 md:pr-12">
          <div className="w-full max-w-lg overflow-hidden flex items-center justify-center">
            <img
              src="/src/assets/iph15.jpg"
              alt="iPhone 15 Pro Max"
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
          <div className="flex gap-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;