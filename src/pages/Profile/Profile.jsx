import { useAuth } from '../../hooks/Auth/useAuth';
import { ProfileCard } from '../../components/Profile/ProfileCard';
import { useNavigate, Link } from 'react-router-dom';

const LoadingState = () => (
  <section className="py-16 bg-white border-b border-gray-100">
    <div className="container mx-auto px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </section>
);

const UnauthorizedState = ({ onLoginClick }) => (
  <section className="py-16 bg-white border-b border-gray-100">
    <div className="container mx-auto px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-6">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
          Вход в личный кабинет
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Для доступа к личному кабинету необходимо войти в систему
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onLoginClick}
            className="w-full px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300"
          >
            Войти в аккаунт
          </button>
          <Link
            to="/register"
            className="block w-full px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light text-center transition-colors duration-300"
          >
            Создать аккаунт
          </Link>
          <Link
            to="/"
            className="block w-full text-gray-500 hover:text-gray-700 py-2 font-light transition-colors duration-300"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  </section>
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
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Личный кабинет
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Добро пожаловать, {user.email}
          </p>
        </div>

        {/* Контент профиля */}
        <div className="max-w-4xl mx-auto">
          <ProfileCard />
        </div>
      </div>
    </section>
  );
};