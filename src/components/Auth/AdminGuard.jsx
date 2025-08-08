import { useAuth } from '../../hooks/Auth/useAuth';

export const AdminGuard = ({ 
  children, 
  fallback = null,
  permission = 'admin'
}) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return fallback;
  }

  return children;
};