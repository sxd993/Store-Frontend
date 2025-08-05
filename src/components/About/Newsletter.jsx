import React from 'react';
import { FaTelegram, FaGift, FaMobile, FaBell } from 'react-icons/fa';

const Newsletter = () => {
  const handleTelegramClick = () => {
    // Открываем Telegram канал в новой вкладке
    window.open('https://t.me/your_channel', '_blank');
  };

  return (
    <section className="py-12 bg-white">
      <div className="text-center">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-gray-900">Подпишитесь на наш Telegram</h2>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto px-4">
              Присоединяйтесь к нашему Telegram каналу и получайте первыми информацию о новых iPhone, 
              эксклюзивных скидках и специальных предложениях
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
            <div className="text-center p-6 md:p-8 bg-white border border-gray-200">
              <div className="flex items-center justify-center mx-auto mb-6 md:mb-8">
                <FaGift className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-gray-900">Эксклюзивные скидки</h3>
              <p className="text-sm md:text-base text-gray-600 font-light">Специальные предложения только для подписчиков</p>
            </div>
            <div className="text-center p-6 md:p-8 bg-white border border-gray-200">
              <div className="flex items-center justify-center mx-auto mb-6 md:mb-8">
                <FaMobile className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-gray-900">Новые товары</h3>
              <p className="text-sm md:text-base text-gray-600 font-light">Узнавайте о новых iPhone первыми</p>
            </div>
            <div className="text-center p-6 md:p-8 bg-white border border-gray-200">
              <div className="flex items-center justify-center mx-auto mb-6 md:mb-8">
                <FaBell className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-gray-900">Быстрые уведомления</h3>
              <p className="text-sm md:text-base text-gray-600 font-light">Получайте уведомления о важных событиях</p>
            </div>
          </div>

          {/* Telegram Button */}
          <div className="max-w-md mx-auto px-4">
            <button 
              onClick={handleTelegramClick}
              className="w-full border-2 border-gray-900 bg-white text-gray-900 px-8 md:px-12 py-4 md:py-5 font-medium text-base md:text-lg hover:bg-gray-900 hover:text-white transition-colors duration-300 flex items-center justify-center gap-3"
            >
              <FaTelegram className="w-5 h-5 md:w-6 md:h-6" />
              Подписаться на Telegram
            </button>
            <p className="text-sm text-gray-500 mt-6 font-light">
              Присоединяйтесь к нашему каналу и будьте в курсе всех новостей
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;