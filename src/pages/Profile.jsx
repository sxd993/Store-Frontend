import { useAuth } from '../features/auth/hooks/useAuth.jsx';
import { ProfileCard } from '../features/auth/components/profile/ProfileCard.jsx';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '../features/auth/components/profile/ProfileStates.jsx';
import { UnauthorizedState } from '../features/auth/components/profile/ProfileStates.jsx';

export const Profile = () => {
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
            Добро пожаловать, {user.name}
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