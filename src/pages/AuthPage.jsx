import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LoginFormContainer } from '../features/auth/components/auth/LoginFormContainer';
import { RegisterFormContainer } from '../features/auth/components/auth/RegisterFormContainer';

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Флаг для предотвращения двойного редиректа
  const [hasRedirected, setHasRedirected] = useState(false);

  const [mode, setMode] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get('mode');
    return modeParam === 'register' || location.pathname === '/register' ? 'register' : 'login';
  });

  const getSmartRedirect = useCallback((userData) => {
    return userData?.is_admin === 1 ? '/catalog' : '/profile';
  }, []);

  // ИСПРАВЛЕННЫЙ useEffect для автоматического редиректа
  useEffect(() => {
    if (!isLoading && isAuthenticated && user && !hasRedirected) {
      setHasRedirected(true);
      const redirectTo = location.state?.from?.pathname || getSmartRedirect(user);
      
      // Используем setTimeout для избежания конфликтов рендеринга
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 0);
    }
  }, [isAuthenticated, isLoading, navigate, location, user, getSmartRedirect, hasRedirected]);

  // ИСПРАВЛЕННЫЙ обработчик успешной авторизации
  const handleSuccess = useCallback((userData) => {
    if (!userData || hasRedirected) return;
    
    setHasRedirected(true);
    const redirectTo = location.state?.from?.pathname || getSmartRedirect(userData);
    
    // Микро-задержка для синхронизации состояния
    setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 50);
  }, [navigate, location, getSmartRedirect, hasRedirected]);

  // Сброс флага при смене режима
  useEffect(() => {
    setHasRedirected(false);
  }, [mode]);

  const config = useMemo(
    () => ({
      login: {
        title: 'Вход в аккаунт',
        subtitle: 'Войдите в аккаунт для покупок и управления заказами',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ),
        component: <LoginFormContainer onSuccess={handleSuccess} />,
      },
      register: {
        title: 'Создание аккаунта',
        subtitle: 'Создайте аккаунт и получите доступ ко всем возможностям',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        ),
        component: <RegisterFormContainer onSuccess={handleSuccess} />,
      },
    }),
    [handleSuccess]
  );

  // Показ загрузки только при начальной проверке авторизации
  if (isLoading && !hasRedirected) {
    return (
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="animate-pulse space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-200 rounded-2xl"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-48 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentConfig = config[mode];

  return (
    <section className="p-14 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Переключатель режимов с синей полоской снизу */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-light transition-colors duration-300 border-b-2 ${
                mode === 'login'
                  ? 'border-blue-600 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              type="button"
              aria-label="Переключиться на вход"
            >
              Вход
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 text-sm font-light transition-colors duration-300 border-b-2 ${
                mode === 'register'
                  ? 'border-blue-600 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              type="button"
              aria-label="Переключиться на регистрацию"
            >
              Регистрация
            </button>
          </div>

          {/* Форма в стиле карточек */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-6">{currentConfig.component}</div>
          </div>
        </div>
      </div>
    </section>
  );
};