import { useForm } from 'react-hook-form';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useEffect, useCallback, useState } from 'react';
import { loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { LoginForm } from '../../ui/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginFormContainer = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isLoginLoading, loginError } = useAuthActions();
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [captchaError, setCaptchaError] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // ✅ БЕЗОПАСНАЯ инициализация капчи
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const initCaptcha = async () => {
      // Ждем полной загрузки DOM
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
      }

      const attemptLoad = () => {
        if (!isMounted) return;

        try {
          // Проверяем наличие необходимых элементов
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

      // Небольшая задержка для гарантии готовности компонента
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

        // Используем loginWithRedirect для корректной синхронизации состояния
        await loginWithRedirect(
          { email: data.email, password: data.password },
          (user) => {
            // Редирект после успешной синхронизации состояния
            navigate('/profile');
          }
        );

      } catch (error) {
        const status = error.response?.status;
        const messages = {
          401: 'Неверный email или пароль',
          429: 'Аккаунт заблокирован на 15 минут из-за слишком многих попыток входа.',
          default: 'Произошла ошибка при входе',
        };
        setError('form', {
          type: 'manual',
          message: messages[status] || error.message || messages.default,
        });
      }
    },
    [loginWithRedirect, setError, navigate, captchaLoaded, captchaError, refreshCaptcha]
  );

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      loginError={loginError}
      isLoginLoading={isLoginLoading}
      captchaLoaded={captchaLoaded}
      captchaError={captchaError}
      onRefreshCaptcha={refreshCaptcha}
    />
  );
};