import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
// Стало:
import { 
  GetProfileApi, 
  LoginApi, 
  RegisterApi, 
  LogoutApi 
} from '../../../shared/api/auth';

export const useAuth = (options = {}) => {
  const queryClient = useQueryClient();
  const { skipInitialLoad = false } = options;

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', 'current'],
    queryFn: async () => {
      try {
        return await GetProfileApi();
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          return null;
        }
        if (error.response?.status === 429) {
          console.warn('Аккаунт заблокирован на 15 минут из-за слишком многих попыток');
          return null;
        }
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 429) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !skipInitialLoad,
  });

  // ИСПРАВЛЕННАЯ система ролей и прав
  const isAuthenticated = !!user;
  
  // Современная проверка админа через hasPermission
  const isAdmin = isAuthenticated && hasPermission('admin');

  const getUserRole = () => {
    if (!isAuthenticated) return 'guest';
    if (hasPermission('admin')) return 'admin';
    return 'user';
  };

  // Централизованная система прав доступа
  function hasPermission(permission) {
    if (!isAuthenticated || !user) return false;
    
    // Определяем админа через is_admin поле
    const userIsAdmin = user.is_admin === 1;
    
    switch (permission) {
      case 'admin':
        return userIsAdmin;
      case 'edit_products':
        return userIsAdmin;
      case 'view_analytics':
        return userIsAdmin;
      case 'manage_users':
        return userIsAdmin;
      case 'access_dashboard':
        return userIsAdmin;
      default:
        return false;
    }
  }

  const requireAdminAccess = (action = 'выполнить это действие') => {
    if (!isAuthenticated) {
      throw new Error('Необходима авторизация');
    }
    if (!hasPermission('admin')) {
      throw new Error(`Недостаточно прав для: ${action}`);
    }
    return true;
  };

  // Возможность вручную проверить актуальное состояние авторизации
  const checkAuth = useCallback(async () => {
    try {
      await refetch();
    } catch (_) {
      // игнорируем, обработка ошибок уже есть в queryFn
    }
  }, [refetch]);

  // Мутации
  const loginMutation = useMutation({
    mutationFn: LoginApi,
    onSuccess: (authData) => {
      queryClient.setQueryData(['user', 'current'], authData.user);
      
      if (authData.token) {
        localStorage.setItem('token', authData.token);
      }
      
      queryClient.invalidateQueries({ 
        queryKey: ['user'], 
        exact: false,
        refetchType: 'none'
      });
    },
    onError: (error) => {
      queryClient.removeQueries(['user', 'current']);
      localStorage.removeItem('token');
      
      if (error.response?.status === 401) {
        console.warn('Неверный email или пароль');
      } else if (error.response?.status === 429) {
        console.warn('Аккаунт заблокирован на 15 минут из-за слишком многих попыток входа');
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: RegisterApi,
    onSuccess: (authData) => {
      queryClient.setQueryData(['user', 'current'], authData.user);
      
      if (authData.token) {
        localStorage.setItem('token', authData.token);
      }
      
      queryClient.invalidateQueries({ 
        queryKey: ['user'], 
        exact: false,
        refetchType: 'none'
      });
    },
    onError: (error) => {
      queryClient.removeQueries(['user', 'current']);
      localStorage.removeItem('token');
      
      if (error.response?.status === 429) {
        console.warn('Слишком много попыток регистрации. Подождите 15 минут.');
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      queryClient.setQueryData(['user', 'current'], null);
      queryClient.removeQueries();
      localStorage.removeItem('token');
    },
    onError: () => {
      queryClient.setQueryData(['user', 'current'], null);
      localStorage.removeItem('token');
    },
  });

  return {
    user,
    isLoading: !skipInitialLoad && isLoading,
    isAuthenticated,
    isAdmin,
    userRole: getUserRole(),
    hasPermission,
    requireAdminAccess,
    checkAuth,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};

// ИСПРАВЛЕНИЕ: getSmartRedirect теперь правильно использует userData
const getSmartRedirect = (userData) => {
  if (userData?.is_admin === 1) {
    return '/catalog'; // Админы в каталог
  }
  return '/profile'; // Пользователи в профиль
};