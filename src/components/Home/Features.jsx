import React from 'react';
import { features, icons } from '../../utils/data';

const Features = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">Почему выбирают нас</h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Мы обеспечиваем лучший сервис и качество для наших клиентов
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20 items-stretch">
        {features.map((feature, index) => {
          const IconComponent = icons[feature.icon];
          return (
            <div key={index} className="group h-full">
              <div className="bg-white border border-gray-200 p-6 sm:p-10 text-center transition-colors duration-300 hover:border-gray-300 h-full flex flex-col">
                {/* Icon */}
                <div className="flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  {IconComponent && <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />}
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-stretch">
        <div className="text-center p-6 sm:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 mb-2 sm:mb-4">50K+</div>
          <div className="text-sm sm:text-base text-gray-600 font-light">Довольных клиентов</div>
        </div>
        <div className="text-center p-6 sm:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 mb-2 sm:mb-4">99%</div>
          <div className="text-sm sm:text-base text-gray-600 font-light">Положительных отзывов</div>
        </div>
        <div className="text-center p-6 sm:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 mb-2 sm:mb-4">24/7</div>
          <div className="text-sm sm:text-base text-gray-600 font-light">Поддержка клиентов</div>
        </div>
        <div className="text-center p-6 sm:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl sm:text-4xl lg:text-6xl font-light text-gray-900 mb-2 sm:mb-4">1-3</div>
          <div className="text-sm sm:text-base text-gray-600 font-light">Дня доставка</div>
        </div>
      </div>
    </section>
  );
};

export default Features; 