import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../features/auth/ui/profile/Sidebar.jsx';
import { UserInfo } from '../features/auth/ui/profile/UserInfo.jsx';
import { UserOrders } from '../features/auth/ui/profile/UserOrders.jsx';
import { useAuth } from '../features/auth/hooks/useAuth.jsx';
import { useAuthActions } from '../features/auth/hooks/useAuthActions.jsx'; // ДОБАВЛЕНО
import { LoadingState, UnauthorizedState } from '../features/auth/ui/profile/states/ProfileStates.jsx';

export const ProfilePage = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { logout } = useAuthActions(); // ДОБАВЛЕНО
  const orders = [
    { id: 1, date: '2025-08-10', status: 'Доставлен', total: '5 000 ₽' }, 
    { id: 2, date: '2025-08-05', status: 'В пути', total: '3 200 ₽' }
  ];
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('info');

  const handleLoginClick = () => {
    navigate('/login', { state: { from: { pathname: '/profile' } } });
  };

  // ИСПРАВЛЕНО: теперь вызываем logout из useAuthActions
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Переходим на главную после успешного выхода
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // В случае ошибки все равно переходим на главную
      navigate('/');
    }
  };

  if (isLoading) return <LoadingState />;
  if (!isAuthenticated) return <UnauthorizedState onLoginClick={handleLoginClick} />;

  return (
    <div className="flex justify-center items-start bg-gray-50 py-10">
      <main className="flex w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden min-h-[90vh]">
        {/* Сайдбар */}
        <Sidebar
          user={user}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        />

        {/* Секции сайдбара */}
        <section className="flex-1 p-8 space-y-6">
          {activeSection === 'info' && <UserInfo user={user} />}
          {activeSection === 'orders' && <UserOrders orders={orders} />}
        </section>
      </main>
    </div>
  );
};