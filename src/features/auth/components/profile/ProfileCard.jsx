import { useAuth } from '../../hooks/useAuth';
import { useAuthActions } from '../../hooks/useAuthActions';
import { Link } from 'react-router-dom';

const UserInfo = ({ user }) => (
  <div className="bg-white border border-gray-200 p-6">
    <h2 className="text-xl font-light text-gray-900 mb-6">Информация о пользователе</h2>
    <div className="space-y-4">
      {user.name && (
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">Имя</label>
          <p className="text-gray-900 border border-gray-200 px-3 py-2 font-light">{user.name}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">Email</label>
        <p className="text-gray-900 border border-gray-200 px-3 py-2 font-light">{user.email}</p>
      </div>

      {user.phone && (
        <div>
          <label className="block text-sm font-light text-gray-700 mb-2">Телефон</label>
          <p className="text-gray-900 border border-gray-200 px-3 py-2 font-light">{user.phone}</p>
        </div>
      )}
    </div>
  </div>
);

const QuickActions = ({ onLogout, isLogoutLoading }) => (
  <div className="bg-white border border-gray-200 p-6">
    <h2 className="text-xl font-light text-gray-900 mb-6">Быстрые действия</h2>
    <div className="space-y-3">
      <Link
        to="/catalog"
        className="block w-full text-center px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
      >
        Перейти в каталог
      </Link>
      <Link
        to="/cart"
        className="block w-full text-center px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
      >
        Моя корзина
      </Link>
      <Link
        to="/about"
        className="block w-full text-center px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
      >
        О нас
      </Link>
      <button
        onClick={onLogout}
        disabled={isLogoutLoading}
        className="w-full px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {isLogoutLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b border-current mr-2"></div>
            Выход...
          </div>
        ) : (
          'Выйти из аккаунта'
        )}
      </button>
    </div>
  </div>
);

export const ProfileCard = () => {
  const { user } = useAuth();
  const { logout, isLogoutLoading } = useAuthActions();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <UserInfo user={user} />
      <QuickActions onLogout={handleLogout} isLogoutLoading={isLogoutLoading} />
    </div>
  );
};