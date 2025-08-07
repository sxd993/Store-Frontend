import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/Auth/authApi';

export const useAuth = (options = {}) => {
  const queryClient = useQueryClient();
  const { skipInitialLoad = false } = options;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      try {
        const response = await api.auth.getProfile();
        return response.data;
      } catch (error) {
        if (error.message.includes('401') || error.message.includes('Токен')) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !skipInitialLoad, // ИСПРАВЛЕНИЕ: можем отключить автозагрузку
  });

  const loginMutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess: (response) => {
      queryClient.setQueryData(['auth', 'user'], response.data);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: api.auth.register,
    onSuccess: (response) => {
      queryClient.setQueryData(['auth', 'user'], response.data);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.removeQueries();
    },
  });

  return {
    user,
    isLoading: !skipInitialLoad && isLoading,
    isAuthenticated: !!user,
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