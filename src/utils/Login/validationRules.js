export const validationRules = {
  name: (isRequired) => ({
    required: isRequired ? 'Имя обязательно для заполнения' : false,
    minLength: {
      value: 2,
      message: 'Имя должно содержать минимум 2 символа'
    },
    pattern: {
      value: /^[a-zA-Zа-яА-Я\s]+$/,
      message: 'Имя может содержать только буквы и пробелы'
    }
  }),

  email: {
    required: 'Email обязателен для заполнения',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Введите корректный email адрес'
    }
  },

  password: (isLogin) => ({
    required: 'Пароль обязателен для заполнения',
    minLength: {
      value: isLogin ? 1 : 8,
      message: isLogin 
        ? 'Введите пароль' 
        : 'Пароль должен содержать минимум 8 символов'
    },
    ...((!isLogin) && {
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        message: 'Пароль должен содержать минимум одну строчную букву, одну заглавную букву и одну цифру'
      }
    })
  })
};
