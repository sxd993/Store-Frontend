import { useAuth } from '../../hooks/Auth/useAuth';
import { ProfileCard } from '../../components/Profile/ProfileCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Загрузка профиля...</p>
    </div>
  </div>
);

const UnauthorizedState = ({ onLoginClick }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md mx-auto text-center p-6">
      <div className="mb-6">
        <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Вход в личный кабинет</h2>
      <p className="text-gray-600 mb-6">
        Для доступа к личному кабинету необходимо войти в систему
      </p>
      
      <div className="space-y-3">
        <button
          onClick={onLoginClick}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Войти в аккаунт
        </button>
        
        <a
          href="/register"
          className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Создать аккаунт
        </a>
        
        <a
          href="/"
          className="block w-full text-gray-600 hover:text-gray-900 py-2 transition-colors"
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  </div>
);

export const ProfilePage = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login', { state: { from: { pathname: '/profile' } } });
  };

  // Если загружаются данные
  if (isLoading) {
    return <LoadingState />;
  }

  // Если не авторизован
  if (!isAuthenticated) {
    return <UnauthorizedState onLoginClick={handleLoginClick} />;
  }

  // Если авторизован - показываем профиль
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка страницы */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Личный кабинет
              </h1>
              <p className="text-gray-600">
                Добро пожаловать, {user.email}!
              </p>
            </div>
            
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              На главную
            </a>
          </div>
        </div>
      </div>

      {/* Контент профиля */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileCard />
      </div>
    </div>
  );
};