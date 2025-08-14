import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useCallback } from 'react';
import { loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { LoginForm } from '../../ui/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginFormContainer = () => {
  const navigate = useNavigate();
  const { login, isLoginLoading, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    loadCaptchaEnginge(4);
    return () => loadCaptchaEnginge(0);
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (!validateCaptcha(data.captcha)) {
          setError('captcha', { type: 'manual', message: 'Неверная капча' });
          loadCaptchaEnginge(4);
          return;
        }

        await login({ email: data.email, password: data.password });

        // Простой редирект на профиль после успешного входа
        navigate('/profile');

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
    [login, setError, navigate]
  );

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      loginError={loginError}
      isLoginLoading={isLoginLoading}
    />
  );
};
