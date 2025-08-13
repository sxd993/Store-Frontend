import { testimonials, icons } from '../../../shared/utils/data';
import { FaStar } from 'react-icons/fa';

export const Reviews = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Отзывы клиентов
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Что говорят о нас наши довольные покупатели
          </p>
        </div>

        {/* Сетка отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {testimonials.map((testimonial) => {
            const AvatarIcon = icons[testimonial.avatar];
            return (
              <div
                key={testimonial.id}
                className="group h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm transition-colors duration-300 hover:border-indigo-200 h-full flex flex-col">
                  
                  {/* Рейтинг */}
                  <div className="flex mb-5">{renderStars(testimonial.rating)}</div>

                  {/* Текст */}
                  <p className="text-base text-gray-700 mb-6 leading-relaxed font-light flex-grow italic">
                    “{testimonial.text}”
                  </p>

                  {/* Автор */}
                  <div className="flex items-center mt-auto">
                    <div className="flex items-center justify-center mr-4">
                      {AvatarIcon && (
                        <AvatarIcon className="w-8 h-8 text-indigo-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 font-light">
                        Покупатель
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
