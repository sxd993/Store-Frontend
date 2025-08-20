export const Sidebar = ({ user, onLogout }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Информация о пользователе */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
          <span className="text-gray-600 font-light text-lg md:text-2xl">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-base md:text-lg font-light text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500 font-light">{user.phone}</p>
        </div>
      </div>

      {/* Кнопка выхода */}
      <button
        onClick={onLogout}
        className="w-full md:w-auto px-6 py-3 rounded-2xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-300 font-light border border-red-200"
      >
        Выйти
      </button>
    </header>
  );
};