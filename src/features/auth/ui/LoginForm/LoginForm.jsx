import { useForm } from 'react-hook-form';
import { useAuth } from '../../model/useAuth.jsx';
import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

export const LoginForm = ({ onSuccess }) => {
  const { login, isLoginLoading, loginError } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  const onSubmit = async (data) => {
    try {
      setFormError('');
      if (!validateCaptcha(data.captcha)) {
        setError('captcha', { type: 'manual', message: 'Неверная капча' });
        loadCaptchaEnginge(4);
        return;
      }
      await login({ email: data.email, password: data.password });
      onSuccess?.();
    } catch (error) {
      // Обработка специфических ошибок
      if (error.response?.status === 401) {
        setFormError('Неверный email или пароль');
      } else if (error.response?.status === 429) {
        setFormError('Аккаунт заблокирован на 15 минут из-за слишком многих попыток входа. Попробуйте позже.');
      } else {
        setFormError(error.message || 'Произошла ошибка при входе');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Введите email"
          className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.email?.message ? 'border-red-500' : ''
          }`}
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Неверный формат email',
            },
          })}
        />
        {errors.email?.message && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-2">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.password?.message ? 'border-red-500' : ''
          }`}
          {...register('password', {
            required: 'Пароль обязателен',
          })}
        />
        {errors.password?.message && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">Капча</label>
        <div className="border border-gray-200 p-3 inline-block">
          <LoadCanvasTemplate />
        </div>
        <input
          type="text"
          inputMode="text"
          placeholder="Введите символы"
          className={`mt-2 w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.captcha?.message ? 'border-red-500' : ''
          }`}
          {...register('captcha', { required: 'Введите капчу' })}
        />
        {errors.captcha?.message && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.captcha.message}</p>
        )}
      </div>

      {(formError || loginError?.message) && (
        <div className="p-4 bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm font-light">{formError || loginError?.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoginLoading}
        className="w-full px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoginLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b border-current mr-2"></div>
            Вход...
          </div>
        ) : (
          'Войти'
        )}
      </button>
    </form>
  );
};