import { useAuth } from '../model/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  permission = null,
  redirectTo = null 
}) => {
  const { isAuthenticated, hasPermission, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Маршруты для НЕавторизованных (login/register)
  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || redirectTo || getSmartRedirect(user);
    return <Navigate to={from} replace />;
  }

  // Требуется авторизация, но пользователь не авторизован
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ИСПРАВЛЕНИЕ: Используем hasPermission вместо isAdmin
  if (requireAdmin && !hasPermission('admin')) {
    return <Navigate to="/access-denied" replace />;
  }

  // ДОБАВЛЕНИЕ: Проверка конкретных разрешений
  if (permission && !hasPermission(permission)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

// ИСПРАВЛЕНИЕ: правильное использование параметра user
const getSmartRedirect = (user) => {
  if (user?.is_admin === 1) {
    return '/catalog'; // Админы в каталог
  }
  return '/profile'; // Пользователи в профиль
};