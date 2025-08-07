import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/useAuth';
import { useEffect } from 'react';
import { AuthLayout } from '../../components/Auth/AuthLayot';
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm';


export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const from = location.state?.from?.pathname || '/profile';

  // ИСПРАВЛЕНИЕ: проверяем авторизацию после загрузки данных
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);
  const handleSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <AuthLayout
      title="Вход"
      subtitle="Войдите в свой аккаунт"
    >
      <LoginForm onSuccess={handleSuccess} />
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Нет аккаунта?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};