import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { GetProfileApi } from '../api/ProfileApi';

export const useAuth = (options = {}) => {
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
    // Добавляем refetchOnWindowFocus для лучшей синхронизации
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Синхронизация с localStorage при изменении пользователя
  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      // Если пользователь удален, но токен есть - очищаем токен
      localStorage.removeItem('token');
    }
  }, [user]);

  const checkAuth = useCallback(async () => {
    try {
      await refetch();
    } catch (_) {
      // игнорируем, обработка ошибок уже есть в queryFn
    }
  }, [refetch]);

  return {
    user,
    isLoading: !skipInitialLoad && isLoading,
    isAuthenticated: !!user,
    checkAuth,
    refetch,
  };
};

export const getSmartRedirect = (userData) => {
  if (userData?.is_admin === 1) {
    return '/catalog';
  }
  return '/profile';
};