import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Вход:', { email: formData.email, password: formData.password });
    } else {
      console.log('Регистрация:', formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Заголовок */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center mb-8">
            <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
              ← Назад на главную
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            {isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            {isLogin 
              ? 'Войдите в свой аккаунт для доступа к персональным настройкам и истории заказов.'
              : 'Создайте аккаунт для быстрого оформления заказов и отслеживания доставки.'
            }
          </p>
        </div>
      </section>

      <div className="max-w-md mx-auto px-6 py-12">
        {/* Переключатель форм */}
        <div className="flex mb-8 border-b border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${
              isLogin 
                ? 'text-gray-900 border-b-2 border-gray-900' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${
              !isLogin 
                ? 'text-gray-900 border-b-2 border-gray-900' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
                placeholder="Ваше имя"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Запомнить меня</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Забыли пароль?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            {isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        {/* Дополнительные опции */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">или</p>
          
          <button className="w-full border-2 border-gray-200 bg-gray-50 text-gray-700 px-8 py-4 font-medium hover:bg-gray-100 transition-colors duration-300 mb-4">
            Войти через Apple
          </button>
          
          <button className="w-full border-2 border-gray-200 bg-gray-50 text-gray-700 px-8 py-4 font-medium hover:bg-gray-100 transition-colors duration-300">
            Войти через Google
          </button>
        </div>

        {/* Ссылка на смену режима */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-gray-900 hover:text-gray-700 transition-colors duration-300"
            >
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
