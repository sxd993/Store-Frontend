import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { LoginApi, RegisterApi, LogoutApi } from '../api/AuthApi';
import { GetProfileApi } from '../api/ProfileApi';

// Константы для query keys
const QUERY_KEYS = {
  USER: ['user', 'current']
};

// Утилиты для работы с токенами
const tokenUtils = {
  get: () => localStorage.getItem('token'),
  set: (token) => localStorage.setItem('token', token),
  remove: () => localStorage.removeItem('token')
};

// Утилиты для редиректов
const redirectUtils = {
  getSmartRedirect: (userData) => {
    return userData?.is_admin === 1 ? '/catalog' : '/profile';
  }
};

export const useAuth = (options = {}) => {
  const queryClient = useQueryClient();
  const { skipInitialLoad = false } = options;

  // =================== ОСНОВНОЙ QUERY ===================
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: async () => {
      const token = tokenUtils.get();
      if (!token) return null;

      try {
        return await GetProfileApi();
      } catch (error) {
        // Автоматическая очистка при ошибках аутентификации
        if ([401, 403, 429].includes(error.response?.status)) {
          tokenUtils.remove();
          return null;
        }
        throw error;
      }
    },
    retry: (failureCount, error) => {
      // Не повторяем запросы при ошибках аутентификации
      if ([401, 403, 429].includes(error?.response?.status)) return false;
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    enabled: !skipInitialLoad,
  });

  // =================== ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ ===================
  const authState = useMemo(() => {
    const isAuthenticated = !!user;
    const isAdmin = isAuthenticated && user?.is_admin === 1;
    
    const getUserRole = () => {
      if (!isAuthenticated) return 'guest';
      return isAdmin ? 'admin' : 'user';
    };

    const hasPermission = (permission) => {
      if (!isAuthenticated) return false;
      
      switch (permission) {
        case 'admin':
        case 'edit_products':
        case 'view_analytics':
        case 'manage_users':
        case 'access_dashboard':
          return isAdmin;
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
      isAuthenticated,
      isAdmin,
      userRole: getUserRole(),
      hasPermission,
      requireAdminAccess
    };
  }, [user]);

  // =================== МУТАЦИИ ===================
  
  // Утилита для обновления кеша пользователя
  const updateUserCache = useCallback((userData, token = null) => {
    if (token) tokenUtils.set(token);
    queryClient.setQueryData(QUERY_KEYS.USER, userData);
  }, [queryClient]);

  // Утилита для очистки кеша
  const clearUserCache = useCallback(() => {
    tokenUtils.remove();
    queryClient.setQueryData(QUERY_KEYS.USER, null);
    queryClient.removeQueries(); // Очищаем все queries
  }, [queryClient]);

  // LOGIN мутация
  const loginMutation = useMutation({
    mutationFn: LoginApi,
    onSuccess: ({ user: userData, token }) => {
      updateUserCache(userData, token);
    },
    onError: () => {
      clearUserCache();
    }
  });

  // REGISTER мутация  
  const registerMutation = useMutation({
    mutationFn: RegisterApi,
    onSuccess: ({ user: userData, token }) => {
      updateUserCache(userData, token);
    },
    onError: () => {
      clearUserCache();
    }
  });

  // LOGOUT мутация
  const logoutMutation = useMutation({
    mutationFn: LogoutApi,
    onSettled: () => {
      clearUserCache(); // Очищаем независимо от результата
    }
  });

  // =================== ПУБЛИЧНЫЕ МЕТОДЫ ===================
  
  // Упрощенный checkAuth
  const checkAuth = useCallback(async () => {
    if (!tokenUtils.get()) {
      clearUserCache();
      return null;
    }
    
    try {
      const userData = await refetch();
      return userData.data;
    } catch (error) {
      clearUserCache();
      return null;
    }
  }, [refetch, clearUserCache]);

  // Универсальный login с поддержкой callback
  const login = useCallback(async (credentials, onSuccess) => {
    try {
      const result = await loginMutation.mutateAsync(credentials);
      
      // Вызываем callback если предоставлен
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result.user);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [loginMutation]);

  // Универсальный register с поддержкой callback
  const register = useCallback(async (userData, onSuccess) => {
    try {
      const result = await registerMutation.mutateAsync(userData);
      
      // Вызываем callback если предоставлен
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result.user);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [registerMutation]);

  // Упрощенный logout
  const logout = useCallback(async () => {
    return logoutMutation.mutateAsync();
  }, [logoutMutation]);

  // =================== ВОЗВРАЩАЕМЫЙ ОБЪЕКТ ===================
  return {
    // Данные пользователя
    user,
    ...authState,

    // Состояния загрузки
    isLoading: !skipInitialLoad && isLoading,
    
    // Методы
    checkAuth,
    login,
    register,
    logout,

    // Состояния мутаций
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,

    // Ошибки мутаций
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};

// Экспортируем утилиту для компонентов
export const getSmartRedirect = redirectUtils.getSmartRedirect;