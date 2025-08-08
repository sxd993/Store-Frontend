import { useAuth } from '../../hooks/Auth/useAuth';
import { ProfileCard } from '../../components/Profile/ProfileCard';
import { useNavigate, Link } from 'react-router-dom';

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b border-gray-900 mx-auto mb-4"></div>
      <p className="text-gray-600 font-light">Загрузка профиля...</p>
    </div>
  </div>
);

const UnauthorizedState = ({ onLoginClick }) => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="max-w-md mx-auto text-center p-6">
      <h2 className="text-3xl font-light text-gray-900 mb-3">Вход в личный кабинет</h2>
      <p className="text-gray-600 mb-6 font-light">
        Для доступа к личному кабинету необходимо войти в систему
      </p>
      <div className="space-y-3">
        <button
          onClick={onLoginClick}
          className="w-full px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-200"
        >
          Войти в аккаунт
        </button>
        <Link
          to="/register"
          className="block w-full px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light text-center transition-colors duration-200"
        >
          Создать аккаунт
        </Link>
        <Link
          to="/"
          className="block w-full text-gray-500 hover:text-gray-700 py-2 font-light transition-colors duration-200"
        >
          Вернуться на главную
        </Link>
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

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return <UnauthorizedState onLoginClick={handleLoginClick} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-center text-3xl font-light text-gray-900 mb-2">Добро пожаловать, {user.email}!</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileCard />
      </div>
    </div>
  );
};