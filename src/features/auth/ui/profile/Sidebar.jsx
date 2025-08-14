export const Sidebar = ({ user, activeSection, onSectionChange, onLogout }) => {
    return (
      <aside className="w-64 bg-gray-100 p-6 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-3">
            <span className="text-white font-bold text-xl">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
  
        <nav className="space-y-2 w-full">
          <button
            onClick={() => onSectionChange('info')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeSection === 'info' ? 'bg-blue-200 text-blue-800 font-semibold' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Общая информация
          </button>
          <button
            onClick={() => onSectionChange('orders')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeSection === 'orders' ? 'bg-blue-200 text-blue-800 font-semibold' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Мои заказы
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-200 transition-colors duration-200"
          >
            Выйти
          </button>
        </nav>
      </aside>
    );
  };