import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { LoginApi, RegisterApi, LogoutApi } from '../api/AuthApi';

export const useAuthActions = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: LoginApi,
    onSuccess: async (authData) => {
      if (authData.token) {
        localStorage.setItem('token', authData.token);
      }
      
      // Устанавливаем данные пользователя
      queryClient.setQueryData(['user', 'current'], authData.user);
      
      // Принудительно обновляем все связанные запросы
      await queryClient.invalidateQueries({
        queryKey: ['user'],
        exact: false,
        refetchType: 'active'
      });
    },
    onError: (error) => {
      queryClient.removeQueries(['user', 'current']);
      localStorage.removeItem('token');
    },
  });

  const registerMutation = useMutation({
    mutationFn: RegisterApi,
    onSuccess: async (authData) => {
      if (authData.token) {
        localStorage.setItem('token', authData.token);
      }
      
      // Устанавливаем данные пользователя
      queryClient.setQueryData(['user', 'current'], authData.user);
      
      // Принудительно обновляем все связанные запросы
      await queryClient.invalidateQueries({
        queryKey: ['user'],
        exact: false,
        refetchType: 'active'
      });
    },
    onError: (error) => {
      queryClient.removeQueries(['user', 'current']);
      localStorage.removeItem('token');
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
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    loginWithRedirect,
    registerWithRedirect,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
