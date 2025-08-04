import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Здесь можно добавить логику отправки email
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Спасибо за подписку!</h2>
          <p className="text-xl opacity-90">
            Теперь вы будете первыми узнавать о новых товарах и специальных предложениях
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-6">Будьте в курсе новостей</h2>
            <p className="text-2xl opacity-90 leading-relaxed">
              Подпишитесь на рассылку и получайте первыми информацию о новых iPhone, 
              эксклюзивных скидках и специальных предложениях
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Эксклюзивные скидки</h3>
              <p className="opacity-80">Специальные предложения только для подписчиков</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Новые товары</h3>
              <p className="opacity-80">Узнавайте о новых iPhone первыми</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Быстрые уведомления</h3>
              <p className="opacity-80">Получайте уведомления о важных событиях</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email" 
                className="flex-1 px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                required
              />
              <button 
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap"
              >
                Подписаться
              </button>
            </div>
            <p className="text-sm opacity-70 mt-4">
              Отписывайтесь в любое время. Мы не спамим.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 