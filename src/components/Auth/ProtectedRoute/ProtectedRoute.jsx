import { useAuth } from '../../../hooks/Auth/useAuth';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Требуется авторизация</h2>
          <p className="text-gray-600 mb-4">Для доступа к этой странице необходимо войти в систему</p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Перейти к входу
          </a>
        </div>
      </div>
    );
  }

  if (adminOnly && !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
          <p className="text-gray-600">У вас нет прав для доступа к этой странице</p>
        </div>
      </div>
    );
  }

  return children;
};
