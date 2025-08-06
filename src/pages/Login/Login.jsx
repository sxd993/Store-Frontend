import { Link } from 'react-router-dom';
import { useAuthForm } from '../../hooks/useAuthForm';
import { AuthInfo } from '../../components/Login/AuthInfo';
import { AuthForm } from '../../components/Login/AuthForm';

const Login = () => {
  const { isLogin, switchForm, onSubmit, formMethods } = useAuthForm();

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
            ← Назад на главную
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-12 py-12 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AuthInfo isLogin={isLogin} />
          <AuthForm 
            isLogin={isLogin}
            switchForm={switchForm}
            onSubmit={onSubmit}
            formMethods={formMethods}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;