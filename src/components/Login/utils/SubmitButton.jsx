export const SubmitButton = ({ isSubmitting, isLogin }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-full border-2 px-8 py-3 font-medium transition-colors duration-300 ${
      isSubmitting
        ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
        : 'border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white'
    }`}
  >
    {isSubmitting 
      ? 'Обработка...' 
      : isLogin 
        ? 'Войти' 
        : 'Создать аккаунт'
    }
  </button>
);