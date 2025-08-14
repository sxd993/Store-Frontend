import { useForm } from 'react-hook-form';
import { useAuth, getSmartRedirect } from '../../hooks/useAuth';
import { useCallback, useState } from 'react';
import { LoginForm } from '../../ui/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginFormContainer = () => {
  const navigate = useNavigate();
  const { login, isLoginLoading, loginError } = useAuth();
  const [captchaToken, setCaptchaToken] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Обработчик успешного решения капчи
  const handleCaptchaVerify = useCallback((token) => {
    setCaptchaToken(token);
    clearErrors('captcha'); // Очищаем ошибку капчи при успешном решении
  }, [clearErrors]);

  // Обработчик истечения капчи
  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
    setError('captcha', { type: 'manual', message: 'Капча истекла, решите заново' });
  }, [setError]);

  // Обработчик ошибки капчи
  const handleCaptchaError = useCallback((error) => {
    setCaptchaToken(null);
    setError('captcha', { type: 'manual', message: 'Ошибка загрузки капчи' });
    console.error('hCaptcha error:', error);
  }, [setError]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        // Проверяем наличие токена капчи
        if (!captchaToken) {
          setError('captcha', { type: 'manual', message: 'Решите капчу для продолжения' });
          return;
        }

        // Используем оптимизированный API с callback
        await login(
          { 
            email: data.email, 
            password: data.password,
            hcaptcha_token: captchaToken // Отправляем токен на сервер
          },
          (user) => {
            const redirectTo = getSmartRedirect(user);
            navigate(redirectTo);
          }
        );

      } catch (error) {
        // Сбрасываем капчу при ошибке
        setCaptchaToken(null);
        
        const status = error.response?.status;
        const messages = {
          401: 'Неверный email или пароль',
          429: 'Слишком много попыток. Попробуйте позже.',
          422: 'Неверная капча или данные формы',
          default: 'Произошла ошибка при входе',
        };
        setError('form', {
          type: 'manual',
          message: messages[status] || error.message || messages.default,
        });
      }
    },
    [login, setError, navigate, captchaToken]
  );

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      loginError={loginError}
      isLoginLoading={isLoginLoading}
      captchaToken={captchaToken}
      onCaptchaVerify={handleCaptchaVerify}
      onCaptchaExpire={handleCaptchaExpire}
      onCaptchaError={handleCaptchaError}
    />
  );
};