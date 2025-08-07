import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
 GetProfileApi, 
 LoginApi, 
 RegisterApi, 
 LogoutApi 
} from '../../api/Auth/AuthApi';

export const useAuth = (options = {}) => {
 const queryClient = useQueryClient();
 const { skipInitialLoad = false } = options;

 const {
   data: user,
   isLoading,
   error,
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
       throw error;
     }
   },
   retry: (failureCount, error) => {
     if (error.response?.status === 401 || error.response?.status === 403) {
       return false;
     }
     return failureCount < 2;
   },
   staleTime: 5 * 60 * 1000,
   enabled: !skipInitialLoad,
 });

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
   onError: () => {
     queryClient.removeQueries(['user', 'current']);
     localStorage.removeItem('token');
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
   onError: () => {
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