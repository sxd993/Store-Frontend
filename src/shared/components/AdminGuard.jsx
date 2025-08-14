import { useAuth } from '../../features/auth/hooks/useAuth.jsx';

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