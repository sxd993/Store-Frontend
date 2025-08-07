import { Button } from '../../ui/Auth/Button';
import { useAuth } from '../../hooks/Auth/useAuth';

const UserInfo = ({ user }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Информация о пользователе</h2>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
          {user.email}
        </p>
      </div>

      {user.phone && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Телефон
          </label>
          <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {user.phone}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Статус
        </label>
        <div className="flex items-center gap-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            user.isAdmin 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {user.isAdmin ? 'Администратор' : 'Пользователь'}
          </span>
        </div>
      </div>

      {user.created_at && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Дата регистрации
          </label>
          <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {new Date(user.created_at).toLocaleDateString('ru-RU')}
          </p>
        </div>
      )}
    </div>
  </div>
);

const QuickActions = ({ onLogout, isLogoutLoading }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Быстрые действия</h2>
    
    <div className="space-y-3">
      <a
        href="/catalog"
        className="block w-full text-center bg-blue-50 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors"
      >
        Перейти в каталог
      </a>
      
      <a
        href="/cart"
        className="block w-full text-center bg-green-50 text-green-700 px-4 py-3 rounded-lg hover:bg-green-100 transition-colors"
      >
        Моя корзина
      </a>
      
      <a
        href="/about"
        className="block w-full text-center bg-gray-50 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        О нас
      </a>
      
      <Button
        onClick={onLogout}
        loading={isLogoutLoading}
        variant="outline"
        className="w-full text-red-600 border-red-300 hover:bg-red-50"
      >
        Выйти из аккаунта
      </Button>
    </div>
  </div>
);

export const ProfileCard = () => {
  const { user, logout, isLogoutLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // После успешного выхода перенаправляем на главную
      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UserInfo user={user} />
      <QuickActions 
        onLogout={handleLogout} 
        isLogoutLoading={isLogoutLoading} 
      />
    </div>
  );
};