import React from 'react';
import { features, icons } from '../../utils/data';

const Features = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">Почему выбирают нас</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Мы обеспечиваем лучший сервис и качество для наших клиентов
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-20 items-stretch">
        {features.map((feature, index) => {
          const IconComponent = icons[feature.icon];
          return (
            <div key={index} className="group h-full">
              <div className="bg-white border border-gray-200 p-6 md:p-10 text-center transition-colors duration-300 hover:border-gray-300 h-full flex flex-col">
                {/* Icon */}
                <div className="flex items-center justify-center mx-auto mb-6 md:mb-8">
                  {IconComponent && <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />}
                </div>
                
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-stretch">
        <div className="text-center p-6 md:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl md:text-6xl font-light text-gray-900 mb-2 md:mb-4">50K+</div>
          <div className="text-sm md:text-base text-gray-600 font-light">Довольных клиентов</div>
        </div>
        <div className="text-center p-6 md:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl md:text-6xl font-light text-gray-900 mb-2 md:mb-4">99%</div>
          <div className="text-sm md:text-base text-gray-600 font-light">Положительных отзывов</div>
        </div>
        <div className="text-center p-6 md:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl md:text-6xl font-light text-gray-900 mb-2 md:mb-4">24/7</div>
          <div className="text-sm md:text-base text-gray-600 font-light">Поддержка клиентов</div>
        </div>
        <div className="text-center p-6 md:p-10 bg-white border border-gray-200 h-full flex flex-col justify-center">
          <div className="text-3xl md:text-6xl font-light text-gray-900 mb-2 md:mb-4">1-3</div>
          <div className="text-sm md:text-base text-gray-600 font-light">Дня доставка</div>
        </div>
      </div>
    </section>
  );
};

export default Features;