import { usePermissions } from '../../features/auth/hooks/usePermissions';

export const AdminGuard = ({
  children,
  fallback = null,
  permission = 'admin'
}) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(permission)) {
    return fallback;
  }

  return children;
};