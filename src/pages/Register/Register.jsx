import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/useAuth';
import { useEffect } from 'react';
import { AuthLayout } from '../../components/Auth/AuthLayot';
import { RegisterForm } from '../../components/Auth/RegisterForm/RegisterForm';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth({ skipInitialLoad: true });

  const handleSuccess = () => {
    // ИЗМЕНЕНИЕ: после регистрации ведем в профиль
    navigate('/profile', { replace: true });
  };

  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Создайте новый аккаунт"
    >
      <RegisterForm onSuccess={handleSuccess} />
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Войти
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};