import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/Auth/useAuth';
import { useState } from 'react';
import { Button } from '../../../ui/Auth/Button';
import { Input } from '../../../ui/Auth/Button';
import { ErrorMessage } from '../../../ui/Auth/Button';

export const RegisterForm = ({ onSuccess }) => {
  const { register: registerUser, isRegisterLoading, registerError } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setFormError('');
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      onSuccess?.();
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Введите email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Неверный формат email',
            },
          })}
        />

        <Input
          id="phone"
          label={
            <>
              Телефон <span className="text-gray-500">(необязательно)</span>
            </>
          }
          type="tel"
          autoComplete="tel"
          placeholder="+7 (999) 123-45-67"
          error={errors.phone?.message}
          {...register('phone', {
            minLength: {
              value: 10,
              message: 'Номер телефона должен содержать минимум 10 цифр',
            },
          })}
        />

        <Input
          id="password"
          label="Пароль"
          type="password"
          autoComplete="new-password"
          placeholder="Минимум 6 символов"
          error={errors.password?.message}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов',
            },
          })}
        />

        <Input
          id="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          autoComplete="new-password"
          placeholder="Повторите пароль"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) =>
              value === password || 'Пароли не совпадают',
          })}
        />
      </div>

      <ErrorMessage message={formError || registerError?.message} />

      <Button
        type="submit"
        variant="secondary"
        loading={isRegisterLoading}
        className="w-full"
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};