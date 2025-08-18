import { LoadCanvasTemplate, loadCaptchaEnginge } from 'react-simple-captcha';
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
        <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-1">
          Имя
        </label>
        <input
          id="name"
          type="text"
          autoComplete="given-name"
          placeholder="Введите ваше имя"
          onKeyDown={(e) => {
            // Разрешаем только буквы, backspace, delete, стрелки
            const allowedKeys = [
              'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
              'Tab', 'Enter', 'Home', 'End'
            ];
            
            // Проверяем, является ли нажатая клавиша буквой
            const isLetter = /^[а-яёa-z]$/i.test(e.key);
            
            // Если это не буква и не разрешенная клавиша - блокируем
            if (!isLetter && !allowedKeys.includes(e.key)) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text').replace(/[^а-яёa-z]/gi, '');
            e.target.value = pastedText;
            // Триггерим событие change для react-hook-form
            const event = new Event('input', { bubbles: true });
            e.target.dispatchEvent(event);
          }}
          className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-light ${
            errors.name ? 'border-red-300 bg-red-50' : 'hover:border-gray-300'
          }`}
          {...register('name', {
            required: 'Имя обязательно',
            minLength: { value: 2, message: 'Имя должно содержать минимум 2 символа' },
            maxLength: { value: 50, message: 'Имя не должно превышать 50 символов' },
            pattern: {
              value: /^[а-яёa-z]+$/i,
              message: 'Имя может содержать только буквы',
            },
          })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 font-light">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-1">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Минимум 6 символов"
          className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-light ${
            errors.password ? 'border-red-300 bg-red-50' : 'hover:border-gray-300'
          }`}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: { value: 6, message: 'Пароль должен содержать минимум 6 символов' },
            validate: {
              hasUppercase: (v) => /[A-ZА-Я]/.test(v || '') || 'Добавьте заглавную букву',
              hasNumber: (v) => /\d/.test(v || '') || 'Добавьте цифру',
            },
          })}
        />
        <ul className="mt-1 space-y-1 text-xs font-light">
          {password && password.length < 6 && (
            <li className="text-red-600">
              <span className="inline-block w-1 h-1 rounded-full bg-current mr-2 align-middle"></span>
              Минимум 6 символов
            </li>
          )}
          {password && !/[A-ZА-Я]/.test(password) && (
            <li className="text-red-600">
              <span className="inline-block w-1 h-1 rounded-full bg-current mr-2 align-middle"></span>
              Хотя бы одна заглавная буква
            </li>
          )}
          {password && !/\d/.test(password) && (
            <li className="text-red-600">
              <span className="inline-block w-1 h-1 rounded-full bg-current mr-2 align-middle"></span>
              Хотя бы одна цифра
            </li>
          )}
        </ul>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 font-light">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-light text-gray-700 mb-1">
          Подтвердите пароль
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Повторите пароль"
          className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-light ${
            errors.confirmPassword ? 'border-red-300 bg-red-50' : 'hover:border-gray-300'
          }`}
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 font-light">{errors.confirmPassword.message}</p>
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

      {(errors.form || registerError) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm font-light">
            {errors.form?.message || registerError?.message}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isRegisterLoading}
        className="w-full px-4 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 rounded-xl"
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