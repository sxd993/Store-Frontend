import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
  LoginApi,
  RegisterApi,
  LogoutApi
} from '../api/AuthApi';
import { GetProfileApi } from '../api/ProfileApi'

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

  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && hasPermission('admin');

  const getUserRole = () => {
    if (!isAuthenticated) return 'guest';
    if (hasPermission('admin')) return 'admin';
    return 'user';
  };

  function hasPermission(permission) {
    if (!isAuthenticated || !user) return false;
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

  const checkAuth = useCallback(async () => {
    try {
      await refetch();
    } catch (_) {
      // игнорируем, обработка ошибок уже есть в queryFn
    }
  }, [refetch]);

  // ИСПРАВЛЕННАЯ мутация логина
  const loginMutation = useMutation({
    mutationFn: LoginApi,
    onSuccess: async (authData) => {
      // Сохраняем токен ПЕРВЫМ делом
      if (authData.token) {
        localStorage.setItem('token', authData.token);
      }

      // Устанавливаем данные пользователя
      queryClient.setQueryData(['user', 'current'], authData.user);

      // КРИТИЧНО: Ждем синхронизации перед вызовом колбэков
      await queryClient.invalidateQueries({
        queryKey: ['user'],
        exact: false,
        refetchType: 'active' // Изменено с 'none' на 'active'
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

  // ИСПРАВЛЕННАЯ мутация регистрации
  const registerMutation = useMutation({
    mutationFn: RegisterApi,
    onSuccess: async (authData) => {
      if (authData.token) {
        localStorage.setItem('token', authData.token);
      }

      queryClient.setQueryData(['user', 'current'], authData.user);

      await queryClient.invalidateQueries({
        queryKey: ['user'],
        exact: false,
        refetchType: 'active'
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

  // НОВЫЙ метод для правильного логина с редиректом
  const loginWithRedirect = useCallback(async (credentials, onSuccess) => {
    try {
      const result = await loginMutation.mutateAsync(credentials);
      
      // Ждем обновления состояния React Query
      await new Promise(resolve => {
        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
          if (event.query.queryKey[0] === 'user' && event.type === 'updated') {
            unsubscribe();
            resolve();
          }
        });
        
        // Фоллбэк через setTimeout
        setTimeout(resolve, 100);
      });

      // Теперь безопасно вызываем onSuccess
      if (onSuccess) {
        onSuccess(result.user);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [loginMutation, queryClient]);

  const registerWithRedirect = useCallback(async (userData, onSuccess) => {
    try {
      const result = await registerMutation.mutateAsync(userData);
      
      // Аналогично для регистрации
      await new Promise(resolve => {
        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
          if (event.query.queryKey[0] === 'user' && event.type === 'updated') {
            unsubscribe();
            resolve();
          }
        });
        setTimeout(resolve, 100);
      });

      if (onSuccess) {
        onSuccess(result.user);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [registerMutation, queryClient]);

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
    // Новые методы для правильной работы с редиректом
    loginWithRedirect,
    registerWithRedirect,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};

export const getSmartRedirect = (userData) => {
  if (userData?.is_admin === 1) {
    return '/catalog';
  }
  return '/profile';
};