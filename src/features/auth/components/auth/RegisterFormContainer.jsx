import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useCallback } from 'react';
import { loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { RegisterForm } from '../../ui/auth/RegisterForm';
import { normalizePhone, formatPhone } from '../../utils/registerValidation';

export const RegisterFormContainer = ({ onSuccess }) => {
  const { register: registerUser, isRegisterLoading, registerError } = useAuth();
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

  // Загрузка капчи после монтирования
  useEffect(() => {
    const timer = setTimeout(() => {
      loadCaptchaEnginge(4);
    }, 0);
    return () => {
      clearTimeout(timer);
      loadCaptchaEnginge(0);
    };
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (!validateCaptcha(data.captcha)) {
          setError('captcha', { type: 'manual', message: 'Неверная капча' });
          loadCaptchaEnginge(4);
          return;
        }
        const { confirmPassword, ...userData } = data;
        userData.phone = normalizePhone(userData.phone);
        await registerUser(userData);
        onSuccess?.();
      } catch (error) {
        setError('form', {
          type: 'manual',
          message: error.message || 'Произошла ошибка при регистрации',
        });
      }
    },
    [registerUser, setError, onSuccess]
  );

  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      control={control}
      password={password}
      formatPhone={formatPhone}
      registerError={registerError}
      isRegisterLoading={isRegisterLoading}
    />
  );
};