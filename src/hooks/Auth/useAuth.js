import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../auth/api/authApi.js';
import { useAuthContext } from '../../auth/context/AuthContext.jsx';

export const useAuth = () => {
  const { user, setUser, clearUser } = useAuthContext();
  const queryClient = useQueryClient();
  
  // Получение данных пользователя
  const { 
    data: userData, 
    isLoading, 
    error,
    refetch: refetchUser 
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: false, // Запускаем вручную
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 минут
    onSuccess: (data) => {
      setUser(data.user);
    },
    onError: () => {
      clearUser();
    }
  });
  
  // Мутация логина
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['currentUser'], data);
      // Можно добавить редирект
      // navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
  
  // Мутация регистрации
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['currentUser'], data);
      // Можно добавить редирект
      // navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });
  
  // Мутация выхода
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
      queryClient.clear(); // Очищаем весь кеш
      // Редирект на страницу входа
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Даже если запрос не прошел, очищаем локальное состояние
      clearUser();
      queryClient.clear();
      window.location.href = '/login';
    }
  });
  
  // Мутация выхода со всех устройств
  const logoutAllMutation = useMutation({
    mutationFn: authApi.logoutAll,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('Logout all failed:', error);
      clearUser();
      queryClient.clear();
      window.location.href = '/login';
    }
  });
  
  // Проверка аутентификации при загрузке
  const checkAuth = () => {
    refetchUser();
  };
  
  return {
    // Состояние
    user: user || userData?.user,
    isAuthenticated: !!(user || userData?.user),
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    
    // Методы
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    logoutAll: logoutAllMutation.mutate,
    checkAuth,
    
    // Состояния мутаций
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
};