export const FormToggle = ({ isLogin, onToggle }) => (
  <div className="flex mb-6 border-b border-gray-200">
    <button
      type="button"
      onClick={() => onToggle(true)}
      className={`flex-1 py-3 text-center font-medium transition-colors duration-300 ${
        isLogin 
          ? 'text-gray-900 border-b-2 border-gray-900' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Вход
    </button>
    <button
      type="button"
      onClick={() => onToggle(false)}
      className={`flex-1 py-3 text-center font-medium transition-colors duration-300 ${
        !isLogin 
          ? 'text-gray-900 border-b-2 border-gray-900' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Регистрация
    </button>
  </div>
);
