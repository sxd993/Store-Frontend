import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useCallback, useState } from 'react';
import { RegisterForm } from '../../ui/auth/RegisterForm';
import { normalizePhone, formatPhone } from '../../utils/registerValidation';

export const RegisterFormContainer = ({ onSuccess }) => {
  const { register: registerUser, isRegisterLoading, registerError } = useAuth();
  const [captchaToken, setCaptchaToken] = useState(null);
  
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const password = watch('password') || '';

  // Обработчики hCaptcha
  const handleCaptchaVerify = useCallback((token) => {
    setCaptchaToken(token);
    clearErrors('captcha');
  }, [clearErrors]);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
    setError('captcha', { type: 'manual', message: 'Капча истекла, решите заново' });
  }, [setError]);

  const handleCaptchaError = useCallback((error) => {
    setCaptchaToken(null);
    setError('captcha', { type: 'manual', message: 'Ошибка загрузки капчи' });
    console.error('hCaptcha error:', error);
  }, [setError]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        // Проверяем капчу
        if (!captchaToken) {
          setError('captcha', { type: 'manual', message: 'Решите капчу для продолжения' });
          return;
        }

        // Проверка совпадения паролей
        if (data.password !== data.confirmPassword) {
          setError('confirmPassword', { type: 'manual', message: 'Пароли не совпадают' });
          return;
        }
        
        const { confirmPassword, ...userData } = data;
        userData.phone = normalizePhone(userData.phone);
        userData.hcaptcha_token = captchaToken; // Добавляем токен капчи
        
        // Используем оптимизированный API с callback
        await registerUser(userData, (user) => {
          onSuccess?.(user);
        });
        
      } catch (error) {
        // Сбрасываем капчу при ошибке
        setCaptchaToken(null);
        
        const status = error.response?.status;
        const messages = {
          422: 'Некорректные данные регистрации',
          409: 'Пользователь с таким email уже существует',
          429: 'Слишком много попыток. Попробуйте позже.',
          400: 'Неверная капча',
          default: 'Произошла ошибка при регистрации',
        };
        
        setError('form', {
          type: 'manual',
          message: messages[status] || error.message || messages.default,
        });
      }
    },
    [registerUser, setError, onSuccess, captchaToken]
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
      captchaToken={captchaToken}
      onCaptchaVerify={handleCaptchaVerify}
      onCaptchaExpire={handleCaptchaExpire}
      onCaptchaError={handleCaptchaError}
    />
  );
};