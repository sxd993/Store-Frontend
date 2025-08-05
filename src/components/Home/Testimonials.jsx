import React from 'react';
import { testimonials, icons } from '../../utils/data';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`w-4 h-4 md:w-5 md:h-5 ${i <= rating ? 'text-gray-600' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">Отзывы клиентов</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Что говорят о нас наши довольные покупатели
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 items-stretch">
        {testimonials.map((testimonial) => {
          const AvatarIcon = icons[testimonial.avatar];
          return (
            <div key={testimonial.id} className="group h-full">
              <div className="bg-white border-2 border-gray-200 p-6 md:p-10 transition-colors duration-300 hover:border-gray-300 h-full flex flex-col">
                {/* Rating */}
                <div className="flex mb-6 md:mb-8">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Text */}
                <p className="text-sm md:text-lg text-gray-700 mb-8 md:mb-10 leading-relaxed font-light flex-grow">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center mt-auto">
                  <div className="flex items-center justify-center mr-4 md:mr-6">
                    {AvatarIcon && <AvatarIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-base md:text-lg">{testimonial.name}</div>
                    <div className="text-sm md:text-base text-gray-500 font-light">Покупатель</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="bg-white border-2 border-gray-200 p-8 md:p-16">
          <h3 className="text-3xl md:text-5xl font-light mb-6 md:mb-8 text-gray-900">Присоединяйтесь к нашим клиентам</h3>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            Получите лучшие цены на iPhone и аксессуары с гарантией качества
          </p>
          <button className="border-2 border-gray-900 bg-white text-gray-900 px-8 md:px-16 py-4 md:py-5 font-medium text-base md:text-lg hover:bg-gray-900 hover:text-white transition-colors duration-300">
            Начать покупки
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;