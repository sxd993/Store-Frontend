import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/Auth/useAuth';
import { useState } from 'react';
import { Button } from '../../../ui/Auth/Button';
import { Input } from '../../../ui/Auth/Button';
import { ErrorMessage } from '../../../ui/Auth/Button';

export const LoginForm = ({ onSuccess }) => {
  const { login, isLoginLoading, loginError } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setFormError('');
      await login(data);
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
          id="password"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          error={errors.password?.message}
          {...register('password', {
            required: 'Пароль обязателен',
          })}
        />
      </div>

      <ErrorMessage message={formError || loginError?.message} />

      <Button
        type="submit"
        loading={isLoginLoading}
        className="w-full"
      >
        Войти
      </Button>
    </form>
  );
};