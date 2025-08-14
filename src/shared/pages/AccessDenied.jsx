import { Link } from 'react-router-dom';
import { usePermissions } from '../../features/auth/hooks/usePermissions';

export const AccessDenied = () => {
  const { userRole } = usePermissions();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Доступ запрещен
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          У вас недостаточно прав для просмотра этой страницы
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Ваша роль: <span className="font-medium">{userRole}</span>
        </p>
        <div className="space-y-3">
          <Link
            to="/catalog"
            className="block w-full px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300"
          >
            Перейти в каталог
          </Link>
          <Link
            to="/"
            className="block w-full px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};