import { useForm, Controller } from 'react-hook-form';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useEffect, useCallback, useState } from 'react';
import { loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { RegisterForm } from '../../ui/auth/RegisterForm';
import { normalizePhone, formatPhone } from '../../utils/registerValidation';

export const RegisterFormContainer = ({ onSuccess }) => {
  const { registerWithRedirect, isRegisterLoading, registerError } = useAuthActions();
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [captchaError, setCaptchaError] = useState(null);

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

  // ✅ БЕЗОПАСНАЯ инициализация капчи (аналогично LoginForm)
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const initCaptcha = async () => {
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
      }

      const attemptLoad = () => {
        if (!isMounted) return;

        try {
          const captchaContainer = document.querySelector('.captcha-container');
          if (!captchaContainer && retryCount < maxRetries) {
            retryCount++;
            setTimeout(attemptLoad, 100 * retryCount);
            return;
          }

          loadCaptchaEnginge(4);
          setCaptchaLoaded(true);
          setCaptchaError(null);
        } catch (error) {
          console.warn(`Ошибка инициализации капчи (попытка ${retryCount + 1}):`, error);
          
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(attemptLoad, 200 * retryCount);
          } else {
            setCaptchaError('Ошибка загрузки капчи. Перезагрузите страницу.');
          }
        }
      };

      setTimeout(attemptLoad, 100);
    };

    initCaptcha();

    return () => {
      isMounted = false;
      try {
        loadCaptchaEnginge(0);
      } catch (error) {
        // Игнорируем ошибки при размонтировании
      }
    };
  }, []);

  // ✅ Безопасное обновление капчи
  const refreshCaptcha = useCallback(() => {
    try {
      loadCaptchaEnginge(4);
      setCaptchaError(null);
    } catch (error) {
      console.warn('Ошибка обновления капчи:', error);
      setCaptchaError('Ошибка обновления капчи');
    }
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      try {
        // Проверяем готовность капчи
        if (!captchaLoaded) {
          setError('captcha', { type: 'manual', message: 'Капча еще загружается' });
          return;
        }

        if (captchaError) {
          setError('captcha', { type: 'manual', message: captchaError });
          return;
        }

        // Проверяем капчу
        try {
          if (!validateCaptcha(data.captcha)) {
            setError('captcha', { type: 'manual', message: 'Неверная капча' });
            refreshCaptcha();
            return;
          }
        } catch (error) {
          setError('captcha', { type: 'manual', message: 'Ошибка проверки капчи' });
          refreshCaptcha();
          return;
        }

        const { confirmPassword, ...userData } = data;
        userData.phone = normalizePhone(userData.phone);
        
        // Используем registerWithRedirect для корректной синхронизации состояния
        await registerWithRedirect(userData, () => {
          onSuccess?.();
        });
      } catch (error) {
        setError('form', {
          type: 'manual',
          message: error.message || 'Произошла ошибка при регистрации',
        });
      }
    },
    [registerWithRedirect, setError, onSuccess, captchaLoaded, captchaError, refreshCaptcha]
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
      captchaLoaded={captchaLoaded}
      captchaError={captchaError}
      onRefreshCaptcha={refreshCaptcha}
    />
  );
};