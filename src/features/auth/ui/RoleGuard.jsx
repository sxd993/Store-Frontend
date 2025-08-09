import { useAuth } from '../model/useAuth.jsx';

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