import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const { handleSubmit, reset } = formMethods;

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        console.log('Вход:', { email: data.email, password: data.password });
      } else {
        console.log('Регистрация:', data);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const switchForm = (loginMode) => {
    setIsLogin(loginMode);
    reset();
  };

  return {
    isLogin,
    switchForm,
    onSubmit: handleSubmit(onSubmit),
    formMethods
  };
};