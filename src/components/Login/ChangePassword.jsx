import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем данные из предыдущей страницы
  const { email, code } = location.state || {};

  useEffect(() => {
    // Если нет данных, перенаправляем на страницу восстановления
    if (!email || !code) {
      navigate('/forgot-password');
    }
  }, [email, code, navigate]);

  // Проверка силы пароля
  useEffect(() => {
    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (/[a-z]/.test(newPassword)) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
    setPasswordStrength(strength);
  }, [newPassword]);

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Слабый';
    if (passwordStrength <= 3) return 'Средний';
    if (passwordStrength <= 4) return 'Хороший';
    return 'Отличный';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'text-red-500';
    if (passwordStrength <= 3) return 'text-yellow-500';
    if (passwordStrength <= 4) return 'text-blue-500';
    return 'text-green-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (passwordStrength < 3) {
      alert('Пароль слишком слабый');
      return;
    }

    setIsLoading(true);
    
    // Имитация смены пароля
    setTimeout(() => {
      setIsLoading(false);
      console.log('Смена пароля:', { email, code, newPassword });
      
      // Перенаправляем на страницу входа с сообщением об успехе
      navigate('/login', { 
        state: { 
          message: 'Пароль успешно изменен! Теперь вы можете войти в аккаунт.' 
        } 
      });
    }, 1500);
  };

  const isFormValid = newPassword && confirmPassword && newPassword === confirmPassword && passwordStrength >= 3;

  return (
    <div className="min-h-screen bg-white">
      {/* Кнопка назад */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/code-confirmation" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
            ← Назад к вводу кода
          </Link>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-12 py-12 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Левая колонка - Заголовок и описание */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Новый пароль
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                Придумайте надежный пароль для вашего аккаунта. Рекомендуем использовать комбинацию букв, цифр и символов.
              </p>
            </div>
            
            {/* Дополнительная информация */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Минимум 8 символов</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Буквы и цифры</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Специальные символы</span>
              </div>
            </div>
          </div>

          {/* Правая колонка - Форма */}
          <div className="max-w-md mx-auto lg:mx-0">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">Создайте новый пароль</h2>
              <p className="text-sm text-gray-600 mb-8">
                Для аккаунта <span className="font-medium">{email}</span>
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Новый пароль */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Новый пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
                      placeholder="Введите новый пароль"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {showNewPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Индикатор силы пароля */}
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength <= 2 ? 'bg-red-500' :
                              passwordStrength <= 3 ? 'bg-yellow-500' :
                              passwordStrength <= 4 ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getPasswordStrengthColor()}`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Подтверждение пароля */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Подтвердите пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border transition-colors duration-300 ${
                        confirmPassword && newPassword !== confirmPassword
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-200 focus:border-gray-900'
                      } focus:outline-none`}
                      placeholder="Повторите новый пароль"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Сообщение о несовпадении паролей */}
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="mt-2 text-sm text-red-500">
                      Пароли не совпадают
                    </p>
                  )}
                  
                  {/* Сообщение о совпадении паролей */}
                  {confirmPassword && newPassword === confirmPassword && (
                    <p className="mt-2 text-sm text-green-500">
                      Пароли совпадают
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className={`w-full px-8 py-3 font-medium transition-colors duration-300 ${
                    isFormValid && !isLoading
                      ? 'border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white'
                      : 'border-2 border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Смена пароля...' : 'Сменить пароль'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword; 