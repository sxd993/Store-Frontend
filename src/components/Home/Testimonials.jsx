import React from 'react';
import { testimonials } from '../../utils/data';

const Testimonials = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Отзывы клиентов</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Что говорят о нас наши довольные покупатели
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Rating */}
                <div className="flex mb-6">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">Покупатель</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Присоединяйтесь к нашим клиентам</h3>
            <p className="text-xl mb-8 opacity-90">
              Получите лучшие цены на iPhone и аксессуары с гарантией качества
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Начать покупки
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 