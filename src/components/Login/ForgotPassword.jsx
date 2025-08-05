import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      
      // Имитация отправки кода
      setTimeout(() => {
        setIsLoading(false);
        console.log('Отправка кода на:', email);
        
        // Переходим на страницу ввода кода
        navigate('/code-confirmation', { 
          state: { email } 
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Кнопка назад */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/login" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
            ← Назад к входу
          </Link>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-12 py-12 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Левая колонка - Заголовок и описание */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Восстановление пароля
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                Введите email, указанный при регистрации. Мы отправим вам код для восстановления пароля.
              </p>
            </div>
            
            {/* Дополнительная информация */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Быстрое восстановление доступа</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Безопасная процедура</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Код приходит на email</span>
              </div>
            </div>
          </div>

          {/* Правая колонка - Форма */}
          <div className="max-w-md mx-auto lg:mx-0">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">Введите ваш email</h2>
              
              <form onSubmit={handleSendCode} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || isLoading}
                  className={`w-full px-8 py-3 font-medium transition-colors duration-300 ${
                    email && !isLoading
                      ? 'border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white'
                      : 'border-2 border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Отправка кода...' : 'Получить код'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 