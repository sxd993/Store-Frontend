export const UserInfo = ({ user }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Общая информация</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Имя</label>
            <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              {user.name}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              {user.email}
            </div>
          </div>
        </div>
      </div>
    );
  };