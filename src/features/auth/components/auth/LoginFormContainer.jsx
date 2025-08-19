import { useForm, Controller } from 'react-hook-form';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useCallback } from 'react';
import { LoginForm } from '../../ui/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { normalizePhone, formatPhone } from '../../utils/registerValidation';
import { useReCaptcha } from '../../../../shared/hooks/useReCaptcha';

export const LoginFormContainer = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isLoginLoading, loginError } = useAuthActions();
  const { executeReCaptcha, isReady } = useReCaptcha();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        // Проверяем готовность reCAPTCHA
        if (!isReady) {
          setError('form', { 
            type: 'manual', 
            message: 'Защита от роботов загружается, попробуйте через несколько секунд' 
          });
          return;
        }

        // Выполняем reCAPTCHA
        const recaptchaToken = await executeReCaptcha('login');
        if (!recaptchaToken) {
          setError('form', { 
            type: 'manual', 
            message: 'Ошибка проверки безопасности, попробуйте еще раз' 
          });
          return;
        }

        // Нормализуем телефон перед отправкой
        const loginData = {
          phone: normalizePhone(data.phone),
          password: data.password,
          recaptchaToken
        };

        // Используем loginWithRedirect для корректной синхронизации состояния
        await loginWithRedirect(
          loginData,
          (user) => {
            // Редирект после успешной синхронизации состояния
            navigate('/profile');
          }
        );

      } catch (error) {
        const status = error.response?.status;
        const messages = {
          401: 'Неверный номер телефона или пароль',
          429: 'Аккаунт заблокирован на 15 минут из-за слишком многих попыток входа.',
          400: 'Проверка безопасности не пройдена',
          default: 'Произошла ошибка при входе',
        };
        setError('form', {
          type: 'manual',
          message: messages[status] || error.message || messages.default,
        });
      }
    },
    [loginWithRedirect, setError, navigate, executeReCaptcha, isReady]
  );

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      control={control}
      formatPhone={formatPhone}
      loginError={loginError}
      isLoginLoading={isLoginLoading}
    />
  );
};