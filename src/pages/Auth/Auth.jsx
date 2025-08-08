import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/useAuth';
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm';
import { RegisterForm } from '../../components/Auth/RegisterForm/RegisterForm';

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  // Определяем режим из URL или query параметров
  const [mode, setMode] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get('mode');
    if (modeParam === 'register') return 'register';
    if (location.pathname === '/register') return 'register';
    return 'login';
  });

  const from = location.state?.from?.pathname || '/profile';

  // Редирект авторизованных пользователей
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  // Обновляем URL при смене режима
  useEffect(() => {
    const currentPath = location.pathname;
    const currentSearch = location.search;
    if (mode === 'register' && currentPath !== '/register') {
      navigate('/register' + currentSearch, { replace: true, state: location.state });
    } else if (mode === 'login' && currentPath !== '/login') {
      navigate('/login' + currentSearch, { replace: true, state: location.state });
    }
  }, [mode, navigate, location]);

  const handleSuccess = () => {
    navigate(from, { replace: true });
  };

  const config = {
    login: {
      title: 'Вход',
      subtitle: 'Войдите в аккаунт для покупок и управления заказами',
      component: <LoginForm onSuccess={handleSuccess} />
    },
    register: {
      title: 'Регистрация',
      subtitle: 'Создайте аккаунт и получите доступ ко всем возможностям',
      component: <RegisterForm onSuccess={handleSuccess} />
    }
  };

  const currentConfig = config[mode];

  // Контейнер всегда с одинаковыми отступами сверху и снизу
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto py-18">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">{currentConfig.title}</h1>
          <p className="text-base text-gray-500 font-light">{currentConfig.subtitle}</p>
        </div>
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-base font-light transition-colors duration-200 border-b-2 ${
              mode === 'login'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            type="button"
          >
            Вход
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-base font-light transition-colors duration-200 border-b-2 ${
              mode === 'register'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            type="button"
          >
            Регистрация
          </button>
        </div>
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          {currentConfig.component}
        </div>
      </div>
    </div>
  );
};