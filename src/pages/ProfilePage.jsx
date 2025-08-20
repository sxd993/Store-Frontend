import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../features/auth/ui/profile/Sidebar.jsx';
import { UserOrders } from '../features/auth/ui/profile/UserOrders.jsx';
import { useAuth } from '../features/auth/hooks/useAuth.jsx';
import { useAuthActions } from '../features/auth/hooks/useAuthActions.jsx';
import { LoadingState, UnauthorizedState } from '../features/auth/ui/profile/states/ProfileStates.jsx';
import { ScrollToTop } from '../shared/components/ScrollToTop.jsx';

export const ProfilePage = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login', { state: { from: { pathname: '/profile' } } });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      navigate('/');
    }
  };

  if (isLoading) return <LoadingState />;
  if (!isAuthenticated) return <UnauthorizedState onLoginClick={handleLoginClick} />;

  return (
    <div className="flex flex-col justify-center items-center bg-white py-4 md:py-10">
      <main className="w-full max-w-6xl bg-white border border-gray-200 rounded-2xl overflow-hidden min-h-[90vh]">
        {/* Header с информацией о пользователе */}
        <Sidebar
          user={user}
          onLogout={handleLogout}
        />

        {/* Основной контент - история заказов */}
        <section className="p-4 md:p-8">
          <UserOrders />
        </section>
        
        {/* Футер с кнопкой "Скролл наверх" */}
        <footer className="p-4 md:p-8 border-t border-gray-200">
          <ScrollToTop />
        </footer>
      </main>
    </div>
  );
};