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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Введите email"
          className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-light ${
            errors.email ? 'border-red-300 bg-red-50' : 'hover:border-gray-300'
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
          <p className="mt-1 text-sm text-red-600 font-light">{errors.email.message}</p>
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

      <div>
        <label className="block text-sm font-light text-gray-700 mb-1">
          Подтвердите, что вы не робот
        </label>
        <div className="border border-gray-200 rounded-xl p-3 mb-3 bg-white">
          <div className="flex justify-center">
            <div className="p-1">
              <LoadCanvasTemplate reloadText="Обновить капчу" reloadColor="#6b7280" />
            </div>
          </div>
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => loadCaptchaEnginge(4)}
              className="text-gray-500 hover:text-gray-700 text-sm font-light transition-colors duration-300 flex items-center justify-center mx-auto group"
              title="Обновить капчу"
            >
              <svg className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Обновить капчу
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Введите символы с изображения"
          className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-light ${
            errors.captcha ? 'border-red-300 bg-red-50' : 'hover:border-gray-300'
          }`}
          {...register('captcha', { required: 'Введите капчу' })}
        />
        {errors.captcha && (
          <p className="mt-1 text-sm text-red-600 font-light">{errors.captcha.message}</p>
        )}
      </div>

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