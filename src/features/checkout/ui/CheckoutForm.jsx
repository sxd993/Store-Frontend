import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../shared/ui/InputFields';

export const CheckoutForm = memo(({ onSubmit, isLoading = false, error = null }) => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange'
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-xl font-light text-gray-900 mb-6">Данные для доставки</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Личные данные */}
        <div className="space-y-4">
          <h4 className="text-base font-light text-gray-900 mb-3">Контактная информация</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              register={register}
              name="firstName"
              placeholder="Имя"
              validation={{ 
                required: 'Имя обязательно',
                minLength: { value: 2, message: 'Минимум 2 символа' }
              }}
              error={formState.errors.firstName}
            />
            <InputField
              register={register}
              name="lastName"
              placeholder="Фамилия"
              validation={{ 
                required: 'Фамилия обязательна',
                minLength: { value: 2, message: 'Минимум 2 символа' }
              }}
              error={formState.errors.lastName}
            />
          </div>
          
          <InputField
            register={register}
            name="phone"
            placeholder="Телефон (+7 xxx xxx-xx-xx)"
            validation={{ 
              required: 'Телефон обязателен',
              pattern: {
                value: /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
                message: 'Неверный формат телефона'
              }
            }}
            error={formState.errors.phone}
          />
          
          <InputField
            register={register}
            name="email"
            type="email"
            placeholder="Email для уведомлений (необязательно)"
            validation={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email'
              }
            }}
            error={formState.errors.email}
          />
        </div>

        {/* Адрес доставки */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h4 className="text-base font-light text-gray-900 mb-3">Адрес доставки</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              register={register}
              name="city"
              placeholder="Город"
              validation={{ required: 'Город обязателен' }}
              error={formState.errors.city}
            />
            <InputField
              register={register}
              name="street"
              placeholder="Улица"
              validation={{ required: 'Улица обязательна' }}
              error={formState.errors.street}
            />
            <InputField
              register={register}
              name="house"
              placeholder="Дом"
              validation={{ required: 'Номер дома обязателен' }}
              error={formState.errors.house}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              register={register}
              name="apartment"
              placeholder="Квартира"
            />
            <InputField
              register={register}
              name="entrance"
              placeholder="Подъезд"
            />
            <InputField
              register={register}
              name="floor"
              placeholder="Этаж"
            />
          </div>
          
          <InputField
            register={register}
            name="postalCode"
            placeholder="Почтовый индекс"
            validation={{
              pattern: {
                value: /^\d{6}$/,
                message: 'Индекс должен содержать 6 цифр'
              }
            }}
            error={formState.errors.postalCode}
          />
        </div>

        {/* Комментарий */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h4 className="text-base font-light text-gray-900 mb-3">Дополнительно</h4>
          
          <InputField
            register={register}
            name="comment"
            type="textarea"
            placeholder="Комментарий к заказу (время доставки, особые пожелания и т.д.)"
            rows={3}
          />
        </div>

        {/* Способ оплаты */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h4 className="text-base font-light text-gray-900 mb-3">Способ оплаты</h4>
          
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                {...register('paymentMethod', { required: 'Выберите способ оплаты' })}
                value="cash"
                className="sr-only"
              />
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-gray-400 flex items-center justify-center transition-colors duration-200">
                <div className="w-2 h-2 bg-gray-900 rounded-full hidden group-has-[:checked]:block"></div>
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Наличными при получении
              </span>
            </label>
            
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                {...register('paymentMethod', { required: 'Выберите способ оплаты' })}
                value="card"
                className="sr-only"
              />
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-gray-400 flex items-center justify-center transition-colors duration-200">
                <div className="w-2 h-2 bg-gray-900 rounded-full hidden group-has-[:checked]:block"></div>
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Картой при получении
              </span>
            </label>
          </div>
          
          {formState.errors.paymentMethod && (
            <p className="text-red-600 text-sm mt-1">{formState.errors.paymentMethod.message}</p>
          )}
        </div>

        {/* Кнопка отправки */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading || !formState.isValid}
            className="w-full py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors duration-300 font-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Создание заказа...</span>
              </div>
            ) : (
              'Оформить заказ'
            )}
          </button>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-700 text-sm font-light">
                {error?.message || 'Ошибка создания заказа'}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
});