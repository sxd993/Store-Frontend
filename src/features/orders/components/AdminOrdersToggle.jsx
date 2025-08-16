import { useState } from 'react';
import { usePermissions } from '../../auth/hooks/usePermissions';
import { UserOrdersList } from './UserOrdersList';
import { AdminOrdersList } from './AdminOrdersList';

export const AdminOrdersToggle = () => {
  const { isAdmin } = usePermissions();
  const [viewMode, setViewMode] = useState('personal'); // 'personal' | 'all'

  // Если не админ, показываем только личные заказы
  if (!isAdmin) {
    return <UserOrdersList />;
  }

  return (
    <div className="space-y-6">
      {/* Переключатель режима просмотра */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setViewMode('personal')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              viewMode === 'personal'
                ? 'bg-white text-gray-900  '
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Мои заказы
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              viewMode === 'all'
                ? 'bg-white text-gray-900  '
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Все заказы пользователей
          </button>
        </div>
      </div>

      {/* Контент в зависимости от выбранного режима */}
      {viewMode === 'personal' ? (
        <UserOrdersList />
      ) : (
        <AdminOrdersList />
      )}
    </div>
  );
};
