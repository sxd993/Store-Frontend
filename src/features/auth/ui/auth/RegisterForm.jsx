import { HCaptchaWrapper } from '../../../../shared/components/HCaptchaWrapper';
import { Controller } from 'react-hook-form';

export const RegisterForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  password,
  formatPhone,
  registerError,
  isRegisterLoading,
  captchaToken,
  onCaptchaVerify,
  onCaptchaExpire,
  onCaptchaError,
}) => {
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
            errors.email ? 'border-red-500' : ''
          }`}
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Неверный формат email',
            },
          })}
        />
        {errors.email && (
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
            errors.name ? 'border-red-500' : ''
          }`}
          {...register('name', {
            required: 'Имя обязательно',
            minLength: { value: 2, message: 'Имя должно содержать минимум 2 символа' },
            maxLength: { value: 50, message: 'Имя не должно превышать 50 символов' },
            pattern: {
              value: /^[а-яёa-z\s-]+$/i,
              message: 'Имя может содержать только буквы, пробелы и дефисы',
            },
          })}
        />
        {errors.name && (
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
              if (!(digits.startsWith('7') || digits.startsWith('8')))
                return 'Телефон должен начинаться с +7';
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
                errors.phone ? 'border-red-500' : ''
              }`}
            />
          )}
        />
        {errors.phone && (
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
            errors.password ? 'border-red-500' : ''
          }`}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: { value: 8, message: 'Пароль должен содержать минимум 8 символов' },
            validate: {
              hasUppercase: (v) => /[A-ZА-Я]/.test(v || '') || 'Добавьте заглавную букву',
              hasNumber: (v) => /\d/.test(v || '') || 'Добавьте цифру',
            },
          })}
        />
        {errors.password && (
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
            errors.confirmPassword ? 'border-red-500' : ''
          }`}
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Переиспользуемый компонент hCAPTCHA */}
      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Подтвердите, что вы не робот
        </label>
        <div className="flex justify-center p-4 border border-gray-200 rounded">
          <HCaptchaWrapper
            onVerify={onCaptchaVerify}
            onExpire={onCaptchaExpire}
            onError={onCaptchaError}
            disabled={isRegisterLoading}
          />
        </div>
        {errors.captcha && (
          <p className="mt-2 text-sm text-red-600 font-light flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errors.captcha.message}
          </p>
        )}
      </div>

      {(errors.form || registerError) && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700 text-sm font-light">
            {errors.form?.message || registerError?.message}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isRegisterLoading || !captchaToken}
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