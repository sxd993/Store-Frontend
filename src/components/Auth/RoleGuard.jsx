import { useAuth } from '../../hooks/Auth/useAuth';

export const RoleGuard = ({ 
  children, 
  roles = [], 
  fallback = null 
}) => {
  const { userRole } = useAuth();

  if (!roles.includes(userRole)) {
    return fallback;
  }

  return children;
};