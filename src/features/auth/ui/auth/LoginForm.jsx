import { Controller } from 'react-hook-form';

export const LoginForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  formatPhone,
  loginError,
  isLoginLoading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-1">
          Номер телефона
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
                if (!e.target.value) onChange('+7 9');
              }}
              onBlur={onBlur}
              autoComplete="tel"
              placeholder="+7 (999) 123-45-67"
              className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-light ${
                errors.phone ? 'border-red-300 bg-red-50' : 'hover:border-gray-300'
              }`}
            />
          )}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 font-light">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-1">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-light ${
            errors.password ? 'border-red-300 bg-red-50' : 'hover:border-gray-300'
          }`}
          {...register('password', { required: 'Пароль обязателен' })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 font-light">{errors.password.message}</p>
        )}
      </div>

      {/* Убираем блок капчи - теперь будет невидимая reCAPTCHA */}

      {(errors.form || loginError) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm font-light">
            {errors.form?.message || loginError?.message}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoginLoading}
        className="w-full px-4 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 rounded-xl"
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