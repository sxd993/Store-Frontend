import { useAuth } from '../../hooks/Auth/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  redirectTo = null 
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
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

  // Требуются админские права
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

// Умный редирект
const getSmartRedirect = (user) => {
  if (user?.is_admin === 1) {
    return '/catalog'; // Админы в каталог
  }
  return '/profile'; // Пользователи в профиль
};