import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../../hooks/Auth/useAuth';
import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

export const RegisterForm = ({ onSuccess }) => {
  const { register: registerUser, isRegisterLoading, registerError } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const password = watch('password') || '';

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  // Форматирование телефонов под +7 (XXX) XXX-XX-XX и нормализация
  const formatPhone = (rawValue) => {
    const digitsOnly = String(rawValue || '').replace(/\D/g, '');
    let normalized = digitsOnly;
    if (normalized.startsWith('8')) normalized = '7' + normalized.slice(1);
    if (normalized.startsWith('7')) normalized = normalized.slice(1);
    const rest = normalized.slice(0, 10);

    let result = '+7';
    if (rest.length > 0) result += ' (' + rest.slice(0, 3);
    if (rest.length >= 3) result += ') ' + rest.slice(3, 6);
    if (rest.length >= 6) result += '-' + rest.slice(6, 8);
    if (rest.length >= 8) result += '-' + rest.slice(8, 10);
    return result;
  };

  const normalizePhone = (formatted) => {
    const digits = String(formatted || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length < 11) return '';
    return '+7' + digits.slice(-10);
  };

  const onSubmit = async (data) => {
    try {
      setFormError('');
      if (!validateCaptcha(data.captcha)) {
        setError('captcha', { type: 'manual', message: 'Неверная капча' });
        loadCaptchaEnginge(4);
        return;
      }
      const { confirmPassword: _, ...userData } = data;
      {
        const normalized = normalizePhone(userData.phone);
        userData.phone = normalized;
      }
      await registerUser(userData);
      onSuccess?.();
    } catch (error) {
      setFormError(error.message);
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
        <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-2">
          Имя
        </label>
        <input
          id="name"
          type="text"
          autoComplete="given-name"
          placeholder="Введите ваше имя"
          className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.name?.message ? 'border-red-500' : ''
          }`}
          {...register('name', {
            required: 'Имя обязательно',
            minLength: {
              value: 2,
              message: 'Имя должно содержать минимум 2 символа',
            },
            maxLength: {
              value: 50,
              message: 'Имя не должно превышать 50 символов',
            },
            pattern: {
              value: /^[а-яёa-z\s-]+$/i,
              message: 'Имя может содержать только буквы, пробелы и дефисы',
            },
          })}
        />
        {errors.name?.message && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-2">
          Телефон
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Номер телефона обязателен',
            validate: (value) => {
              const digits = String(value || '').replace(/\D/g, '');
              if (!(digits.startsWith('7') || digits.startsWith('8'))) return 'Телефон должен начинаться с +7';
              return digits.length === 11 || 'Введите номер полностью';
            },
          }}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <input
              id="phone"
              type="tel"
              ref={ref}
              value={value || ''}
              onChange={(e) => onChange(formatPhone(e.target.value))}
              onFocus={(e) => {
                if (!e.target.value) onChange('+7 ');
              }}
              onBlur={onBlur}
              autoComplete="tel"
              placeholder="+7 (999) 123-45-67"
              className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
                errors.phone?.message ? 'border-red-500' : ''
              }`}
            />
          )}
        />
        {errors.phone?.message && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-2">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Минимум 8 символов"
          className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.password?.message ? 'border-red-500' : ''
          }`}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 8,
              message: 'Пароль должен содержать минимум 8 символов',
            },
            validate: {
              hasUppercase: (v) => /[A-ZА-Я]/.test(v || '') || 'Добавьте заглавную букву',
              hasNumber: (v) => /\d/.test(v || '') || 'Добавьте цифру',
            },
          })}
        />
        {errors.password?.message && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.password.message}</p>
        )}
        <ul className="mt-2 space-y-1 text-xs font-light">
          <li className={`${password.length >= 8 ? 'text-gray-600' : 'text-red-600'}`}>
            <span className="inline-block w-1 h-1 rounded-full bg-current mr-2 align-middle"></span>
            Минимум 8 символов
          </li>
          <li className={`${/[A-ZА-Я]/.test(password) ? 'text-gray-600' : 'text-red-600'}`}>
            <span className="inline-block w-1 h-1 rounded-full bg-current mr-2 align-middle"></span>
            Хотя бы одна заглавная буква
          </li>
          <li className={`${/\d/.test(password) ? 'text-gray-600' : 'text-red-600'}`}>
            <span className="inline-block w-1 h-1 rounded-full bg-current mr-2 align-middle"></span>
            Хотя бы одна цифра
          </li>
        </ul>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-light text-gray-700 mb-2">
          Подтвердите пароль
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Повторите пароль"
          className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.confirmPassword?.message ? 'border-red-500' : ''
          }`}
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) =>
              value === password || 'Пароли не совпадают',
          })}
        />
        {errors.confirmPassword?.message && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.confirmPassword.message}</p>
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

      {(formError || registerError?.message) && (
        <div className="p-4 bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm font-light">{formError || registerError?.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isRegisterLoading}
        className="w-full px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isRegisterLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b border-current mr-2"></div>
            Регистрация...
          </div>
        ) : (
          'Зарегистрироваться'
        )}
      </button>
    </form>
  );
};