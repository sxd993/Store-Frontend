import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full bg-white border-b border-gray-100">
      <div className="py-24 flex flex-col lg:flex-row items-center min-h-[600px]">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center mb-12 lg:mb-0 lg:pr-12">
          <div className="w-full max-w-2xl aspect-square border border-gray-200 overflow-hidden flex items-center justify-center rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="iPhone 15 Pro"
              className="object-cover w-full h-full"
              onError={(e) => {
                console.log('Image failed to load');
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col items-start justify-center lg:pl-12">
          <span className="mb-8 px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium uppercase tracking-wider border border-gray-200">
            Новинка
          </span>
          <h1 className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight">
            iPhone 15 Pro
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
            Титан. Очень прочный. Очень лёгкий. Очень Pro.
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-xl leading-relaxed">
            Откройте для себя новую эру iPhone с революционным дизайном из титана, 
            мощным чипом A17 Pro и профессиональной камерой. 
            Самый продвинутый iPhone в истории.
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