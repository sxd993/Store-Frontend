import { useAuth } from './useAuth';

export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();

  const hasPermission = (permission) => {
    if (!isAuthenticated || !user) return false;
    const userIsAdmin = user.is_admin === 1;

    switch (permission) {
      case 'admin':
      case 'edit_products':
      case 'view_analytics':
      case 'manage_users':
      case 'access_dashboard':
        return userIsAdmin;
      default:
        return false;
    }
  };

  const requireAdminAccess = (action = 'выполнить это действие') => {
    if (!isAuthenticated) {
      throw new Error('Необходима авторизация');
    }
    if (!hasPermission('admin')) {
      throw new Error(`Недостаточно прав для: ${action}`);
    }
    return true;
  };

  return {
    hasPermission,
    requireAdminAccess,
    isAdmin: hasPermission('admin'),
    userRole: !isAuthenticated ? 'guest' : hasPermission('admin') ? 'admin' : 'user',
  };
};
