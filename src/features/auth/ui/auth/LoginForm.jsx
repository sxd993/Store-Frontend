import { LoadCanvasTemplate, loadCaptchaEnginge } from 'react-simple-captcha';

export const LoginForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loginError,
  isLoginLoading,
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
        <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-2">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.password ? 'border-red-500' : ''
          }`}
          {...register('password', { required: 'Пароль обязателен' })}
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600 font-light">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-light text-gray-700 mb-2">
          Подтвердите, что вы не робот
        </label>
        <div className="border border-gray-200 p-4 mb-5">
          <div className="flex justify-center">
            <div className="p-4">
              <LoadCanvasTemplate reloadText="Обновить капчу" reloadColor="#6b7280" />
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={() => loadCaptchaEnginge(4)}
              className="text-gray-500 hover:text-gray-700 text-sm font-light transition-colors duration-200 flex items-center justify-center mx-auto"
              title="Обновить капчу"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Обновить капчу
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Введите символы с изображения"
          className={`w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors duration-200 font-light ${
            errors.captcha ? 'border-red-500 bg-red-50' : ''
          }`}
          {...register('captcha', { required: 'Введите капчу' })}
        />
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

      {(errors.form || loginError) && (
        <div className="p-4 bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm font-light">
            {errors.form?.message || loginError?.message}
          </p>
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