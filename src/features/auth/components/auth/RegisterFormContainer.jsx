import { useForm, Controller } from 'react-hook-form';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useCallback } from 'react';
import { RegisterForm } from '../../ui/auth/RegisterForm';
import { normalizePhone, formatPhone } from '../../utils/registerValidation';

export const RegisterFormContainer = ({ onSuccess }) => {
  const { registerWithRedirect, isRegisterLoading, registerError } = useAuthActions();

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

  const onSubmit = useCallback(
    async (data) => {
      try {
        const { confirmPassword, ...userData } = data;
        userData.phone = normalizePhone(userData.phone);
        
        // Используем registerWithRedirect для корректной синхронизации состояния
        await registerWithRedirect(userData, () => {
          // После успешной регистрации будет SMS подтверждение
          onSuccess?.();
        });
      } catch (error) {
        setError('form', {
          type: 'manual',
          message: error.message || 'Произошла ошибка при регистрации',
        });
      }
    },
    [registerWithRedirect, setError, onSuccess]
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